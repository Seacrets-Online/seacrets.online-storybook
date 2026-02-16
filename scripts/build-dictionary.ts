import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config';
import { validateTokenStudioExportFile } from './validate-token-studio-export';

validateTokenStudioExportFile();
const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
