export type MetaDocumentId = |
  'version' | 'onboarding'

export type VersionMetaDocumentData = {
  android: VersionMeta;
  ios: VersionMeta;
} & VersionMeta; // DEPRECATED extending VersionMeta kept for backwards compat
  
export type VersionMeta = {
  minimumVersion: string;
  latestVersion: string;
  currentMajor: number;
}

export type OnboardingMetaDocumentData = {
  onboardingTipId: string;
}