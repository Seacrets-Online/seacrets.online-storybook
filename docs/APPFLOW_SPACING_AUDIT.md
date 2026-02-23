# AppFlow Spacing Audit

Spacing scale (from `spacing.generated.ts`): 4, 8, 12, 16, 24, 32, 48, 64 px.
MUI units: space4=0.5, space8=1, space12=1.5, space16=2, space24=3, space32=4, space48=6, space64=8.

## Before Standardization

| Component | Property | Value | Token |
|-----------|----------|-------|-------|
| FeedTemplate | px, py | 2, 2 | space16 |
| FeedTemplate | header mb | 2 | space16 |
| FeedTemplate | list gap | 2 | space16 |
| SearchTemplate | px, py | 4, 3 | space16, space24 |
| SearchTemplate | header mb | 3 | space24 |
| SearchTemplate | section mb | 2 | space16 |
| SearchTemplate | results gap | 2 | space16 |
| CreateStoryTemplate | px, py | 4, 3 | space16, space24 |
| CreateStoryTemplate | header mb | 3 | space24 |
| CreateStoryTemplate | back gap, mb | 0.5, 2 | space4, space16 |
| CreateStoryTemplate | title gap, mb | 1, 3 | space8, space24 |
| OnboardingStepTemplate | px, py | 4, 3 | space16, space24 |
| OnboardingStepTemplate | header mb | 3 | space24 |
| OnboardingStepTemplate | progress spacing, mb | 1, 3 | space8, space24 |
| OnboardingStepTemplate | stack spacing | 3 | space24 |
| OnboardingStepTemplate | button pt | 4 | space32 |
| OnboardingStepTemplate | footer pt, pb | 4, 2 | space32, space16 |
| LoginTemplate | px, py | 4, 3 | space16, space24 |
| GlobalHeader | gap | 2 | space16 |
| AppFlow | nav p | 1 | space8 |
| AppFlow | default box p | 4 | space32 |
| FeedCard | mb (media, action) | 1.5 | 12px (space12) |
| SearchResultCard | mb, mt | 1.5, 0.5 | space12, space4 |

## Standardization Rules

- Container padding: px=4 (space16), py=3 (space24) for all templates
- Header margin-bottom: 3 (space24)
- Section-to-content: 2 (space16)
- List/card gaps: 2 (space16)
- Compact (icon-text): 0.5→1 (space4→space8) or keep 0.5 for tight
- Non-scale values (1.5, 0.5): map to space12, space4

## Changes Applied (Full Project)

All gaps, margins (m, mt, mb, mx, my), and padding (p, px, py, pt, pb) now use `theme.layout.spaceN` tokens across:
- **Molecules**: FilterTag, UploadArea, LanguagePopper, SegmentedControl, PillTabGroup, LegalLinks
- **Organisms**: FeedCard, SearchResultCard, GlobalHeader, SearchSection, BottomSliderPanel, AuthForm, MultiStepForm, MediaCropWrapper, CreateStoryForm, FileUpload, AppBar, EmptyState, ActionRow
- **Templates**: CreateStoryTemplate, FeedTemplate, ProfileTemplate, SearchTemplate, OnboardingStepTemplate, LoginTemplate, CreateOptionsTemplate
