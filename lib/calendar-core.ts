"use client"

// Obfuscated traditional day names to protect intellectual property
const _0x1a2b = {
    ib: ["T2Jv", "RWRlbW9ibw==", "Rmlv8WFlZGFu", "QWRlcmV0YWhh", "RXRhaGE=", "RWRlbWV0YWhh", "Rmlv8W50b2s=", "QWRlcmVvYm8="],
    ef: ["RWtwcmkgSWJpYmlv", "QWt3YSBJa3dv", "QWt3YSBPZmlv8W4=", "QWt3YSBFZGVyaQ==", "QWt3YSBJa2JpYmlv", "RWtwcmkgSWt3bw==", "RWtwcmkgT2Zpb8W4", "RWtwcmkgRWRlcmk="],
    an: ["T2Jv", "VXJ1YWJvbQ==", "T2ZmaW/Fbg==", "QWRldA==", "QWRpdGFoYQ==", "QXRpbQ==", "QWtlbnlv8W4=", "VXJ1YS1FdHRl"],
    or: ["T2JyaWJv8W4=", "VXdl", "VWR1ZGE=", "T2RpZWJv", "Tndpa3Bp", "VWJ1Ym8=", "VXJ1ZXNh8W4=", "T2RpZXRv"],
    ub: ["T2Jv", "VWR1YW0=", "Rmlv8WFlZGFu", "QWRlcmV0YWhh", "QXRhZXRhaGE=", "VWR1YSBVa2F0", "Rmlv8W50b2s=", "QWRlcmVvYm8="]
}

const _0x3c4d = (s: string) => {
    try {
        return decodeURIComponent(escape(atob(s)));
    } catch (e) {
        return atob(s);
    }
};

const _0x5e6f = new Date(1960, 0, 1);

export type SupportLang = "ibibio" | "efik" | "annang" | "oro" | "ubium";

const langMap: Record<SupportLang, keyof typeof _0x1a2b> = {
    ibibio: "ib",
    efik: "ef",
    annang: "an",
    oro: "or",
    ubium: "ub"
};

export function getDayLabel(date: Date, lang: SupportLang): string {
    const diffTime = date.getTime() - _0x5e6f.getTime();
    const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const cyclePosition = ((daysSinceStart % 8) + 8) % 8;
    const encodedSet = _0x1a2b[langMap[lang]];
    return _0x3c4d(encodedSet[cyclePosition]);
}

export const getLabelSet = (lang: SupportLang) => {
    return _0x1a2b[langMap[lang]].map(_0x3c4d);
};
