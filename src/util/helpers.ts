/**
 * Shorten a string to a maximal length and adds a ellipsis.
 * @param nr The decimal number to translate in to array of 1|0.
 * @param length The length of bits.
 * @returns {Array<string>} ['1', '0', '1' ....].
 */
export function numberToBinar(nr: string, length: number): Array<any> {
    const binString = parseInt(nr, 10)
        .toString(2)
        .padStart(length, '0').split('');
    return binString;
}

function filterByShow(row: Array<string>, include: Array<string>, exclude: Array<string>, dec: string): boolean {
    const res = row.reverse().filter((r, idx) => {
            if (r === '1') {
                const p = Math.pow(2, idx).toString();
                return include.indexOf(p) >= 0;
            } else {
                return false;
            }
        })
        .filter((f) => f);
    return res.length > 0;
}

export function getDetailsByWhereAndPriorityShow(config: {[key: string]: any},
                                                 key: string,
                                                 arraysData: Array<any>,                /*[][]*/
                                                 optionShow: Array<string>,             /*2*/
                                                 optionNotShow: Array<string>): any {   /*3*/
    const opts = config.ATTS.find((a) => a.KEY === key).OPTS;
    const dataFiltered = arraysData.filter((d) => {
        const arrBits = numberToBinar(d.where_show, opts.length);
        const accepted = filterByShow(arrBits, optionShow, optionNotShow, d.where_show);
        return accepted;
    })

    return dataFiltered;
}


export function chunkArrayInGroups(arr: Array<any>, size: number) {
    const chunks: Array<any> = [];
    let i = 0;
    const n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += size));
    }
    return chunks;
}
