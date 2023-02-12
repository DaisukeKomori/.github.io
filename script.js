'use strict'
// 1行目に記載している 'use strict' は削除しないでください

function test(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("Test PASSED.");
      } else {
        console.error("Test FAILED. Keep trying!");
        console.group("Result:");
        console.log("  actual:", actual);
        console.log("expected:", expected);
        console.groupEnd();
      }   
}

/**
 * @param {any} - オブジェクト(ex: Array, Object, string)
 * @param {string} - 期待するデータ型（ex:"String"、"Array"、"Number"） 
 * @returns {boolean} - オブジェクトのデータ型が合致しているか否か
**/
// 引数の値のTypeが合致しているか返す
function chkType(obj, type) {
    const funcNameRegex = /function (.{1,})\(/;
    const results = (funcNameRegex).exec(obj.constructor.toString());
    if (results && results.length > 1) {
        return results[1].toLowerCase() === type.toLowerCase();
    }
    return false;   
}
