import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Box } from "./Box";
import { colorTokens } from "../../utils/colors.generated";
import { spacingTokens } from "../../utils/spacing.generated";

export interface CameraCaptureCardProps {
  value?: string;
  onChange?: (dataUrl: string) => void;
  error?: string;
  onErrorChange?: (error: string) => void;
  aspectRatio?: string;
  facingMode?: "user" | "environment";
  className?: string;
}

export interface CameraCaptureCardRef {
  capture: () => void;
}

/**
 * CameraCaptureCard Atom
 * Camera capture area with video streaming and image preview.
 * Uses design tokens for all styling.
 */
export const CameraCaptureCard = forwardRef<CameraCaptureCardRef, CameraCaptureCardProps>((
  {
    value,
    onChange,
    error,
    onErrorChange,
    aspectRatio = "4 / 3",
    facingMode = "environment",
    className = "",
  },
  ref
) => {
  const colors = colorTokens.dark;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [starting, setStarting] = useState(false);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      onErrorChange?.("Tu navegador no soporta cámara.");
      return;
    }
    setStarting(true);
    onErrorChange?.("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Camera error:", err);
      onErrorChange?.(
        "No pudimos acceder a tu cámara. Revisa permisos e inténtalo de nuevo.",
      );
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value) stopCamera();
    if (!value && !error) startCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const capture = () => {
    const video = videoRef.current;
    if (!video) return;

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onChange?.(dataUrl);
  };

  const retry = () => {
    onChange?.("");
    stopCamera();
    startCamera();
  };

  // Expose capture method to parent
  useImperativeHandle(ref, () => ({
    capture,
  }));

  return (
    <Box className={className} sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio,
          borderRadius: `${spacingTokens["24"]}px`,
          overflow: "hidden",
          backgroundColor: colors.mdSysColorSurfaceContainerLow,
          border: `1px solid ${colors.mdSysColorOutlineVariant}`,
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Foto capturada"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <button
              type="button"
              onClick={retry}
              aria-label="Reintentar"
              style={{
                position: "absolute",
                top: `${spacingTokens["12"]}px`,
                left: `${spacingTokens["12"]}px`,
                width: "34px",
                height: "34px",
                borderRadius: "999px",
                backgroundColor: colors.mdSysColorScrim,
                opacity: 0.75,
                color: colors.mdSysColorOnPrimary,
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                lineHeight: 1,
                cursor: "pointer",
                border: "none",
                transition: "filter 140ms ease, transform 140ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "";
                e.currentTarget.style.transform = "";
              }}
            >
              ✕
            </button>
          </>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </Box>
    </Box>
  );
});

CameraCaptureCard.displayName = "CameraCaptureCard";

export default CameraCaptureCard;
