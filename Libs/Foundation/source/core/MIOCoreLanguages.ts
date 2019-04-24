
let _miocore_languages = null;
export function MIOCoreAddLanguage(lang, url)
{
    if (_miocore_languages == null) _miocore_languages = {};
    _miocore_languages[lang] = url;
}

export function MIOCoreGetLanguages()
{
    return _miocore_languages;
}
