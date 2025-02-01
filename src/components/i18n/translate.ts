import hu from './hu.json'
import en from './en.json'

type TranslationObject = {
  [key: string]: string | TranslationObject;
}

const getStringByKey = (key: string, obj: TranslationObject): string => {
    let currentObj: any = obj;
    const keys = key.split('.');
    
    for (let i = 0; i < keys.length; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
            console.error(`Translation string with key ${key} does not exist`);
            return 'Unknown';
        }
    }
    return currentObj as string;
}

const getTranslationsByLanguage = (lang: string): TranslationObject => {
    if (lang === 'hu') return hu;
    return en;
}

export const getUserLanguage = (): string => {
    const language = (window.navigator as any).userLanguage || window.navigator.language;
    return language.split('-')[0];
}

export const translate = (key: string, lang: string | null = null): string => {
   const translations = getTranslationsByLanguage(lang ?? getUserLanguage());
   return getStringByKey(key, translations);
}
