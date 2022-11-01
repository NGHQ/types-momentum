export type MetaDocumentId = |
  'version' | 'onboarding'

  export type VersionMetaDocumentData = {
    android: VersionMeta;
    ios: VersionMeta;
  }
  
  export type VersionMeta = {
    minimumVersion: string;
    latestVersion: string;
    currentMajor: number;
  }
export type OnboardingMetaDocumentData = {
  onboardingTipId: string;
}