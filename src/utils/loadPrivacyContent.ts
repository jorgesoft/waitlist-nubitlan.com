import yaml from 'js-yaml';
import { asset } from '../lib/asset';

export interface ContentSection {
  heading: string;
  content: string;
}

export interface PolicyContent {
  title: string;
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
