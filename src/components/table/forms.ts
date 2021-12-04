interface IReferenceFilter {
    "f_name_":      string;
    "f_value":      string;
    "f_operator" :  string;
}
interface IReference {
    "formid":       string;
    "saveKey":      string;
    "displayKey":   string;
    "filter":       Array<IReferenceFilter>;
}

interface IOpts {
    TITEL:          string;
    TITEL_I18N:     string;
    VALUE:          string;
}

export interface IAttendands {
    Info:       string;
    KEY:        string
    NAME:       string;
    NAME_I18N:  string;
    OPTS:       Array<IOpts>;
    READONLY:   number;
    REQUIRED:   string;
    TYPE:       number;
    UNIQUE:     string;
    REFERENCE:  IReference;
}

interface ISrc {
    id:     string;
    type:   string;
}

export interface IRowAttendands {
    ATTS:               Array<IAttendands>;
    Info:               string;
    SRC:                ISrc;
    TITEL:              string
    TITEL_ANZEIGE:      string;
    TITEL_ANZEIGE_I18N: string;
}

export interface IConfigForms {
    [key: string]: IRowAttendands;
}

export function validityFormLength(value: number) {
    switch(value) {
        case 1:
            return {input: 'input', type: 25};
        case 2:
            return {input: 'input', type: 50};
        case 3:
            return {input: 'input', type: 100};
        case 4:
            return {input: 'textarea', type: Infinity};
        case 5:
            return {input: 'input', type: 'number'};
        case 6:
            return {input: 'input', type: 'number'};    // SMALLINT
        case 7:
            return {input: 'input', type: 'number'};    // DOUBLE
        case 8:
            return {input: 'input', type: 'number'};    // REFERENZ
        case 9:
            return {input: 'input', type: 'number'};    // MULTI
        case 10:
            return {input: 'input', type: 'CHECKBOX'};
        case 11:
            return {input: 'input', type: 'number'};    // ARCHIV
        case 12:
            return {input: 'input', type: 'number'};    // LIVE
        case 13:
            return {input: 'input', type: 'Date'};
        case 14:
            return {input: 'input', type: 'number'};    // ARCHIV_FOLDER
        case 15:
            return {input: 'input', type: 'number'};    // REFERENZ-DYNAMISCH
        case 16:
            return {input: 'input', type: 'number'};    // HIDDEN
        case 17:
            return {input: 'input', type: 'number'};    // STATUS
        case 18:
            return {input: 'input', type: 'Time'};      // TIME
        case 19:
            return {input: 'input', type: 'number'};    // TIMESPAN
        case 20:
            return {input: 'input', type: 'Minutes'};   // TIMESPAN
        case 21:
            return {input: 'input', type: 'DateTime'};  // DATETIME
        case 22:
            return {input: 'input', type: 'binary'};  // MULTISELECT AS BINARY
        default:
            return {input: 'input', type: 100};
    }
}

// TYPE: 2 => input string
// TYPE: 5 => input number
// TYPE: 8 => selectbox

// "READONLY": 1            disabled => only readOnly
// "REQUIRED": "REQUIRED",  isRequired
// "UNIQUE": "YES",         unique


/*
*           ApiForms::$types["CHAR25"]          = 1;
            ApiForms::$types["CHAR50"]          = 2;
            ApiForms::$types["CHAR100"]         = 3;
            ApiForms::$types["TEXT"]            = 4;
            ApiForms::$types["INT"]             = 5;
            ApiForms::$types["SMALLINT"]        = 6;
            ApiForms::$types["DOUBLE"]          = 7;
            ApiForms::$types["REFERENZ"]        = 8;
            ApiForms::$types["MULTI"]           = 9;
            ApiForms::$types["CHECKBOX"]        = 10;
            ApiForms::$types["ARCHIV"]          = 11;
            ApiForms::$types["LIVE"]            = 12;
            ApiForms::$types["DATE"]            = 13;
            ApiForms::$types["ARCHIV_FOLDER"]   = 14;
            ApiForms::$types["REFERENZ-DYNAMISCH"] = 15;
            ApiForms::$types["HIDDEN"]          = 16;
            ApiForms::$types["STATUS"]          = 17;
            ApiForms::$types["TIME"]            = 18;
            ApiForms::$types["TIMESPAN"]        = 19;
			ApiForms::$types["MINUTES"]         = 20;
			ApiForms::$types["DATETIME"]        = 21;
*
* */
