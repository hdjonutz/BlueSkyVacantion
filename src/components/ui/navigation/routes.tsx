/**
 * Definiert die Interfaces die für die Routen-Definition benötigt werden.
 */
import * as React from 'react';
import {RouteComponentProps} from 'react-router';
// import {LicenseSet} from '../../../services/license_service';
// import {PermissionSet} from '../../../services/authentication_service';

const LicenseSet: any;
const PermissionSet: any;

interface WithTitle {
    /**
     * Titel der Seite als Text. Wird nicht benötigt wenn ein i18n-Key angeben wird.
     */
    title: string;
    /**
     * Titel der Seite als i18n-Key. Wird nicht benötigt wenn ein Text angeben wird.
     */
    titleI18n?: never;
}

interface WithTranslatedTitle {
    /**
     * Titel der Seite als Text. Wird nicht benötigt wenn ein i18n-Key angeben wird.
     */
    title?: never;
    /**
     * Titel der Seite als i18n-Key. Wird nicht benötigt wenn ein Text angeben wird.
     */
    titleI18n: string;
}

interface WithoutIcon {
    /**
     * Icon als Name. Wird nicht benötigt wenn ein Icon file path angeben wird.
     */
    icon?: never;
    /**
     * Legacy Icon als file path, sollte nicht mehr verwendet werden. Wird nicht benötigt wenn ein Icon Name angeben
     * wird.
     */
    iconPath?: never;
}

interface WithIcon {
    /**
     * Icon als Name. Wird nicht benötigt wenn ein Icon file path angeben wird.
     */
    icon: string;
    /**
     * Legacy Icon als file path, sollte nicht mehr verwendet werden. Wird nicht benötigt wenn ein Icon Name angeben
     * wird.
     */
    iconPath?: never;
}

interface WithLegacyIcon {
    /**
     * Icon als Name. Wird nicht benötigt wenn ein Icon file path angeben wird.
     */
    icon?: never;
    /**
     * Legacy Icon als file path, sollte nicht mehr verwendet werden. Wird nicht benötigt wenn ein Icon Name angeben
     * wird.
     */
    iconPath: string;
}

interface WithComponent {
    /**
     * Pfad der Route.
     * Muss mit einem Slash beginnen und kann zusätzlich Routen-Parameter enthalten.
     * Beispiel: /test/:parameterA/:parameterB/hallo-welt
     */
    path: string;
    /**
     * Der angegebene Pfad muss exakt, also auch mit Trailing-Slash passen.
     */
    strict?: boolean;
    /**
     * Klasse der Komponente die für diese Route angezeigt werden soll. Wird nicht benötigt wenn eine render-Funktion
     * angeben wird.
     */
    component: React.ComponentType<RouteComponentProps<any> | {}>;
    /**
     * render-Funktion die ausgeführt wird wenn die Route aktiv ist.  Wird nicht benötigt wenn eine Komponenten-Klasse
     * angeben wird.
     */
    render?: never;

    display_btn?:   boolean;
}

interface WithRender {
    /**
     * Pfad der Route.
     * Muss mit einem Slash beginnen und kann zusätzlich Routen-Parameter enthalten.
     * Beispiel: /test/:parameterA/:parameterB/hallo-welt
     */
    path: string;
    /**
     * Der angegebene Pfad muss exakt, also auch mit Trailing-Slash passen.
     */
    strict?: boolean;
    /**
     * Klasse der Komponente die für diese Route angezeigt werden soll. Wird nicht benötigt wenn eine render-Methode
     * angeben wird.
     */
    component?: never;
    /**
     * render-Funktion die ausgeführt wird wenn die Route aktiv ist.  Wird nicht benötigt wenn eine Komponenten-Klasse
     * angeben wird.
     */
    render: ((props: RouteComponentProps<any>) => React.ReactNode);
}

/**
 * Definition einer Route mit Pfand und der angezeigten Komponente.
 */
export type ChildRoute = (WithComponent | WithRender);

/**
 * Basis für Menüeintrage und Gruppen.
 */
export type MenuEntry = (WithTitle | WithTranslatedTitle) & (WithoutIcon | WithIcon | WithLegacyIcon) & {
    /**
     * Pfad der Route.
     */
    path: string;
};

/**
 * Menüeintrag unter in einer Menü-Gruppe.
 */
export type MenuItem = MenuEntry & ChildRoute & {
    // TODO: Für Lizenzen und Rechte: Es wäre Klasse wenn statt der Predicate hier eine Object basierendes Expression
    // System existieren würde (also UND, ODER, NOT) die beliebig kombiniert werden können. Dann hätte man nämlich die
    // möglichkeit die Expression als Text in Fehler komplett auszugeben: "Sie haben keinen zugriff weil die die
    // Berechtigung x oder y benötigen".
    /**
     * Optionales Delegate um zu prüfen ob eine oder mehrere benötigte Lizenzen vorhanden sind.
     */
    licenses?: (licenses: any) => boolean;
    /**
     * Optionales Delegate um zu prüfen ob eine oder mehrere benötigte Berechtigungen vorhanden sind.
     */
    permissions?: (permissions: any) => boolean;
    /**
     * Kinder-Routen, kann dazu genutzt werden um weitere (z.B. parametrisierte Routen) an den selben (oder anderen)
     * Komponenten weiterzuleiten. Falls eine Komponente intern weitere Routen verwendet, müssen diese hier nicht
     * zwingen angeben werden, hier ist nur die Angabe von Basis-Routen nötig.
     */
    children?: ReadonlyArray<ChildRoute>;
    /**
     * Deaktiviert einen Menüpunkt komplett, z.B. weil er nicht Implementiert ist.
     */
    disabled?: boolean
};

/**
 * Menü-Gruppe
 */
export type MenuGroup = MenuEntry & {
    /**
     * Liste der Menüeinträge für diese Gruppe.
     */
    items: ReadonlyArray<MenuItem>;
    /**
     * Übergeordneter Pfad für diese Kategorie. Wird genutzt um die richtige Gruppe zu markieren.
     * Beispiel: Wenn der übergeordnete Pfad "/online" ist, sind die Menüeinträge unter "/online/eintrag" zu finden.
     */
    path: string;
    /**
     * Optionale Startseite für diese Menügruppe, wenn im Pfad keine Unterseite angeben wird.
     */
    defaultPath?: string;
    /**
     * Optionale Funktion zum Rendern eines eigenen Menübuttons (z.B. um an einen Button eine Badge anzuhängen,
     * Animationen, etc.).
     */
    renderButton?(): React.ReactElement<any>;
};
