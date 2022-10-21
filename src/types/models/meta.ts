export type MetaDocumentId = |
  'version' | 'onboarding'

export type VersionMetaDocumentData = {
  minimumVersion: string;
  latestVersion: string;
  currentMajor: number;
}

export type OnboardingMetaDocumentData = {
  onboardingTipId: string;
}