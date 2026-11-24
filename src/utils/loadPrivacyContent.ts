import yaml from 'js-yaml';
import { asset } from '../lib/asset';

export interface ContentSection {
  /** Anchor, so products can link to their part: /privacidad#trx-lite. */
  id?: string;
  heading: string;
  content: string;
}

export interface PolicyContent {
  title: string;
  /** Version that products record when someone acknowledges the policy. */
  version?: string;
  lastUpdated: string;
  sections: ContentSection[];
}

export interface PrivacyContent {
  privacy: PolicyContent;
  terms: PolicyContent;
}

export async function loadPrivacyContent(): Promise<PrivacyContent> {
  try {
    const response = await fetch(asset('/privacy.yaml'));
    if (!response.ok) {
      throw new Error(`Failed to load privacy content: ${response.statusText}`);
    }
    const yamlText = await response.text();
    const content = yaml.load(yamlText) as PrivacyContent;
    return content;
  } catch (error) {
    console.error('Error loading privacy content:', error);
    throw error;
  }
}
