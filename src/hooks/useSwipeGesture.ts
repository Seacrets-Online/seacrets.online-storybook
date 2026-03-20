import { useRef, useState, useCallback } from "react";

export type SwipeDirection = "left" | "right" | "up" | "none";

export interface SwipeState {
  /** Current horizontal offset in px */
  x: number;
  /** Current vertical offset in px */
  y: number;
  /** Rotation in degrees (proportional to x) */
  rotation: number;
  /** Whether the user is actively dragging */
  isDragging: boolean;
  /** Detected direction when threshold is crossed */
  direction: SwipeDirection;
  /** 0..1 progress towards the swipe threshold */
  progress: number;
}

export interface UseSwipeGestureOptions {
  /** Minimum px to travel before a swipe is registered (default 120) */
  threshold?: number;
  /** Max rotation angle in degrees at threshold (default 15) */
  maxRotation?: number;
  /** Duration ms of the exit animation (default 300) */
  exitDuration?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
}

const VELOCITY_THRESHOLD = 0.5; // px/ms — fast flick triggers swipe even below distance threshold

export function useSwipeGesture({
  threshold = 120,
  maxRotation = 15,
  exitDuration = 300,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}: UseSwipeGestureOptions = {}) {
  const [state, setState] = useState<SwipeState>({
    x: 0,
    y: 0,
    rotation: 0,
    isDragging: false,
    direction: "none",
    progress: 0,
  });

  const startPos = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const animating = useRef(false);

  const getDirection = useCallback(
    (dx: number, dy: number): SwipeDirection => {
      if (dy < -threshold * 0.8 && Math.abs(dx) < threshold) return "up";
      if (dx < -threshold * 0.5) return "left";
      if (dx > threshold * 0.5) return "right";
      return "none";
    },
    [threshold],
  );

  const resetState = useCallback(() => {
    setState({
      x: 0,
      y: 0,
      rotation: 0,
      isDragging: false,
      direction: "none",
      progress: 0,
    });
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (animating.current) return;
      const dx = clientX - startPos.current.x;
      const dy = clientY - startPos.current.y;
      const rotation = (dx / threshold) * maxRotation;
      const progress = Math.min(Math.abs(dx) / threshold, 1);
      const direction = getDirection(dx, dy);

      setState({
        x: dx,
        y: dy,
        rotation,
        isDragging: true,
        direction,
        progress,
      });
    },
    [threshold, maxRotation, getDirection],
  );

  const handleEnd = useCallback(
    (clientX: number, clientY: number) => {
      if (animating.current) return;
      const dx = clientX - startPos.current.x;
      const dy = clientY - startPos.current.y;
      const dt = Date.now() - startTime.current || 1;
      const velocity = Math.abs(dx) / dt;

      const distanceMet =
        Math.abs(dx) >= threshold ||
        (dy < -threshold * 0.8 && Math.abs(dx) < threshold);
      const flickMet =
        velocity > VELOCITY_THRESHOLD && Math.abs(dx) > threshold * 0.3;

      if (distanceMet || flickMet) {
        animating.current = true;
        const direction = getDirection(dx, dy);

        // Fly card off-screen
        const exitX =
          direction === "left"
            ? -window.innerWidth
            : direction === "right"
              ? window.innerWidth
              : 0;
        const exitY = direction === "up" ? -window.innerHeight : 0;
        const exitRotation =
          direction === "up" ? 0 : (dx / threshold) * maxRotation * 2;

        setState({
          x: exitX,
          y: exitY,
          rotation: exitRotation,
          isDragging: false,
          direction,
          progress: 1,
        });

        setTimeout(() => {
          if (direction === "left") onSwipeLeft?.();
          else if (direction === "right") onSwipeRight?.();
          else if (direction === "up") onSwipeUp?.();
          animating.current = false;
          resetState();
        }, exitDuration);
      } else {
        // Snap back
        resetState();
      }
    },
    [
      threshold,
      maxRotation,
      exitDuration,
      getDirection,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      resetState,
    ],
  );

  /* — Touch handlers — */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    startPos.current = { x: t.clientX, y: t.clientY };
    startTime.current = Date.now();
    setState((s) => ({ ...s, isDragging: true }));
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      handleMove(t.clientX, t.clientY);
    },
    [handleMove],
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      handleEnd(t.clientX, t.clientY);
    },
    [handleEnd],
  );

  /* — Mouse handlers (for Storybook desktop preview) — */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startPos.current = { x: e.clientX, y: e.clientY };
      startTime.current = Date.now();
      setState((s) => ({ ...s, isDragging: true }));

      const moveHandler = (ev: MouseEvent) =>
        handleMove(ev.clientX, ev.clientY);
      const upHandler = (ev: MouseEvent) => {
        handleEnd(ev.clientX, ev.clientY);
        window.removeEventListener("mousemove", moveHandler);
        window.removeEventListener("mouseup", upHandler);
      };
      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseup", upHandler);
    },
    [handleMove, handleEnd],
  );

  /** Style object to apply to the draggable element */
  const dragStyle: React.CSSProperties = {
    transform: `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`,
    transition: state.isDragging
      ? "none"
      : `transform ${exitDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    cursor: state.isDragging ? "grabbing" : "grab",
    touchAction: "none",
    userSelect: "none",
    willChange: "transform",
  };

  /** Programmatic swipe (for action buttons) */
  const triggerSwipe = useCallback(
    (direction: "left" | "right" | "up") => {
      if (animating.current) return;
      animating.current = true;

      const exitX =
        direction === "left"
          ? -window.innerWidth
          : direction === "right"
            ? window.innerWidth
            : 0;
      const exitY = direction === "up" ? -window.innerHeight : 0;
      const exitRotation =
        direction === "left"
          ? -maxRotation * 2
          : direction === "right"
            ? maxRotation * 2
            : 0;

      setState({
        x: exitX,
        y: exitY,
        rotation: exitRotation,
        isDragging: false,
        direction,
        progress: 1,
      });

      setTimeout(() => {
        if (direction === "left") onSwipeLeft?.();
        else if (direction === "right") onSwipeRight?.();
        else if (direction === "up") onSwipeUp?.();
        animating.current = false;
        resetState();
      }, exitDuration);
    },
    [
      maxRotation,
      exitDuration,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      resetState,
    ],
  );

  return {
    state,
    dragStyle,
    handlers: { onTouchStart, onTouchMove, onTouchEnd, onMouseDown },
    triggerSwipe,
  };
}

export default useSwipeGesture;
