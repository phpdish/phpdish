webpackJsonp([4],{/***/
"/eEn":/***/
function(e,t,n){"use strict";function r(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");
// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
return"="===e[t-2]?2:"="===e[t-1]?1:0}function i(e){
// base64 is 4/3 + up to two characters of the original data
return 3*e.length/4-r(e)}function o(e){var t,n,i,o,a,s=e.length;o=r(e),a=new f(3*s/4-o),
// if there are placeholders, only get up to the last complete 4 chars
n=o>0?s-4:s;var l=0;for(t=0;t<n;t+=4)i=c[e.charCodeAt(t)]<<18|c[e.charCodeAt(t+1)]<<12|c[e.charCodeAt(t+2)]<<6|c[e.charCodeAt(t+3)],a[l++]=i>>16&255,a[l++]=i>>8&255,a[l++]=255&i;return 2===o?(i=c[e.charCodeAt(t)]<<2|c[e.charCodeAt(t+1)]>>4,a[l++]=255&i):1===o&&(i=c[e.charCodeAt(t)]<<10|c[e.charCodeAt(t+1)]<<4|c[e.charCodeAt(t+2)]>>2,a[l++]=i>>8&255,a[l++]=255&i),a}function a(e){return u[e>>18&63]+u[e>>12&63]+u[e>>6&63]+u[63&e]}function s(e,t,n){for(var r,i=[],o=t;o<n;o+=3)r=(e[o]<<16)+(e[o+1]<<8)+e[o+2],i.push(a(r));return i.join("")}function l(e){// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var t,n=e.length,r=n%3,i="",o=[],a=0,l=n-r;a<l;a+=16383)o.push(s(e,a,a+16383>l?l:a+16383));
// pad the end with zeros, but make sure to not forget the extra bytes
return 1===r?(t=e[n-1],i+=u[t>>2],i+=u[t<<4&63],i+="=="):2===r&&(t=(e[n-2]<<8)+e[n-1],i+=u[t>>10],i+=u[t>>4&63],i+=u[t<<2&63],i+="="),o.push(i),o.join("")}t.byteLength=i,t.toByteArray=o,t.fromByteArray=l;for(var u=[],c=[],f="undefined"!=typeof Uint8Array?Uint8Array:Array,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,h=d.length;p<h;++p)u[p]=d[p],c[d.charCodeAt(p)]=p;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},/***/
0:/***/
function(e,t){},/***/
"0ISM":/***/
function(e,t,n){/* WEBPACK VAR INJECTION */
(function(t,r){/* globals chrome: false */
/* globals __dirname: false */
/* globals require: false */
/* globals Buffer: false */
/* globals module: false */
/**
 * Typo is a JavaScript implementation of a spellchecker using hunspell-style 
 * dictionaries.
 */
var i;!function(){"use strict";/**
 * Typo constructor.
 *
 * @param {String} [dictionary] The locale code of the dictionary being used. e.g.,
 *                              "en_US". This is only used to auto-load dictionaries.
 * @param {String} [affData]    The data from the dictionary's .aff file. If omitted
 *                              and Typo.js is being used in a Chrome extension, the .aff
 *                              file will be loaded automatically from
 *                              lib/typo/dictionaries/[dictionary]/[dictionary].aff
 *                              In other environments, it will be loaded from
 *                              [settings.dictionaryPath]/dictionaries/[dictionary]/[dictionary].aff
 * @param {String} [wordsData]  The data from the dictionary's .dic file. If omitted
 *                              and Typo.js is being used in a Chrome extension, the .dic
 *                              file will be loaded automatically from
 *                              lib/typo/dictionaries/[dictionary]/[dictionary].dic
 *                              In other environments, it will be loaded from
 *                              [settings.dictionaryPath]/dictionaries/[dictionary]/[dictionary].dic
 * @param {Object} [settings]   Constructor settings. Available properties are:
 *                              {String} [dictionaryPath]: path to load dictionary from in non-chrome
 *                              environment.
 *                              {Object} [flags]: flag information.
 *                              {Boolean} [asyncLoad]: If true, affData and wordsData will be loaded
 *                              asynchronously.
 *                              {Function} [loadedCallback]: Called when both affData and wordsData
 *                              have been loaded. Only used if asyncLoad is set to true. The parameter
 *                              is the instantiated Typo object.
 *
 * @returns {Typo} A Typo object.
 */
i=function(e,n,r,i){function o(e,t){var n=h._readFile(e,null,i.asyncLoad);i.asyncLoad?n.then(function(e){t(e)}):t(n)}function a(e){n=e,r&&l()}function s(e){r=e,n&&l()}function l(){for(h.rules=h._parseAFF(n),
// Save the rule codes that are used in compound rules.
h.compoundRuleCodes={},c=0,d=h.compoundRules.length;c<d;c++){var e=h.compoundRules[c];for(f=0,p=e.length;f<p;f++)h.compoundRuleCodes[e[f]]=[]}
// If we add this ONLYINCOMPOUND flag to self.compoundRuleCodes, then _parseDIC
// will do the work of saving the list of words that are compound-only.
"ONLYINCOMPOUND"in h.flags&&(h.compoundRuleCodes[h.flags.ONLYINCOMPOUND]=[]),h.dictionaryTable=h._parseDIC(r);
// Get rid of any codes from the compound rule codes that are never used 
// (or that were special regex characters).  Not especially necessary... 
for(c in h.compoundRuleCodes)0===h.compoundRuleCodes[c].length&&delete h.compoundRuleCodes[c];
// Build the full regular expressions for each compound rule.
// I have a feeling (but no confirmation yet) that this method of 
// testing for compound words is probably slow.
for(c=0,d=h.compoundRules.length;c<d;c++){var t=h.compoundRules[c],o="";for(f=0,p=t.length;f<p;f++){var a=t[f];a in h.compoundRuleCodes?o+="("+h.compoundRuleCodes[a].join("|")+")":o+=a}h.compoundRules[c]=new RegExp(o,"i")}h.loaded=!0,i.asyncLoad&&i.loadedCallback&&i.loadedCallback(h)}i=i||{},this.dictionary=null,this.rules={},this.dictionaryTable={},this.compoundRules=[],this.compoundRuleCodes={},this.replacementTable=[],this.flags=i.flags||{},this.memoized={},this.loaded=!1;var u,c,f,d,p,h=this;
// If the data is preloaded, just setup the Typo object.
return e&&(h.dictionary=e,n&&r?l():"undefined"!=typeof window&&"chrome"in window&&"extension"in window.chrome&&"getURL"in window.chrome.extension?(u=i.dictionaryPath?i.dictionaryPath:"typo/dictionaries",n||o(chrome.extension.getURL(u+"/"+e+"/"+e+".aff"),a),r||o(chrome.extension.getURL(u+"/"+e+"/"+e+".dic"),s)):(u=i.dictionaryPath?i.dictionaryPath:t+"/dictionaries",n||o(u+"/"+e+"/"+e+".aff",a),r||o(u+"/"+e+"/"+e+".dic",s))),this},i.prototype={/**
	 * Loads a Typo instance from a hash of all of the Typo properties.
	 *
	 * @param object obj A hash of Typo properties, probably gotten from a JSON.parse(JSON.stringify(typo_instance)).
	 */
load:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);return this},/**
	 * Read the contents of a file.
	 * 
	 * @param {String} path The path (relative) to the file.
	 * @param {String} [charset="ISO8859-1"] The expected charset of the file
	 * @param {Boolean} async If true, the file will be read asynchronously. For node.js this does nothing, all
	 *        files are read synchronously.
	 * @returns {String} The file data if async is false, otherwise a promise object. If running node.js, the data is
	 *          always returned.
	 */
_readFile:function(e,t,i){if(t=t||"utf8","undefined"!=typeof XMLHttpRequest){var o,a=new XMLHttpRequest;return a.open("GET",e,i),i&&(o=new Promise(function(e,t){a.onload=function(){200===a.status?e(a.responseText):t(a.statusText)},a.onerror=function(){t(a.statusText)}})),a.overrideMimeType&&a.overrideMimeType("text/plain; charset="+t),a.send(null),i?o:a.responseText}
// Node.js
var s=n(0);try{if(s.existsSync(e)){var l=s.statSync(e),u=s.openSync(e,"r"),c=new r(l.size);return s.readSync(u,c,0,c.length,null),c.toString(t,0,c.length)}console.log("Path "+e+" does not exist.")}catch(e){return console.log(e),""}},/**
	 * Parse the rules out from a .aff file.
	 *
	 * @param {String} data The contents of the affix file.
	 * @returns object The rules from the file.
	 */
_parseAFF:function(e){var t,n,r,i,o,a,s,l,u={};
// Remove comment lines
e=this._removeAffixComments(e);var c=e.split("\n");for(o=0,s=c.length;o<s;o++){t=c[o];var f=t.split(/\s+/),d=f[0];if("PFX"==d||"SFX"==d){var p=f[1],h=f[2];r=parseInt(f[3],10);var g=[];for(a=o+1,l=o+1+r;a<l;a++){n=c[a],i=n.split(/\s+/);var m=i[2],v=i[3].split("/"),y=v[0];"0"===y&&(y="");var b=this.parseRuleCodes(v[1]),w=i[4],k={};k.add=y,b.length>0&&(k.continuationClasses=b),"."!==w&&(k.match="SFX"===d?new RegExp(w+"$"):new RegExp("^"+w)),"0"!=m&&(k.remove="SFX"===d?new RegExp(m+"$"):m),g.push(k)}u[p]={type:d,combineable:"Y"==h,entries:g},o+=r}else if("COMPOUNDRULE"===d){for(r=parseInt(f[1],10),a=o+1,l=o+1+r;a<l;a++)t=c[a],i=t.split(/\s+/),this.compoundRules.push(i[1]);o+=r}else"REP"===d?(i=t.split(/\s+/),3===i.length&&this.replacementTable.push([i[1],i[2]])):
// ONLYINCOMPOUND
// COMPOUNDMIN
// FLAG
// KEEPCASE
// NEEDAFFIX
this.flags[d]=f[1]}return u},/**
	 * Removes comment lines and then cleans up blank lines and trailing whitespace.
	 *
	 * @param {String} data The data from an affix file.
	 * @return {String} The cleaned-up data.
	 */
_removeAffixComments:function(e){
// Remove comments
// This used to remove any string starting with '#' up to the end of the line,
// but some COMPOUNDRULE definitions include '#' as part of the rule.
// I haven't seen any affix files that use comments on the same line as real data,
// so I don't think this will break anything.
// Trim each line
// Remove blank lines.
// Trim the entire string
return e=e.replace(/^\s*#.*$/gm,""),e=e.replace(/^\s\s*/m,"").replace(/\s\s*$/m,""),e=e.replace(/\n{2,}/g,"\n"),e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},/**
	 * Parses the words out from the .dic file.
	 *
	 * @param {String} data The data from the dictionary file.
	 * @returns object The lookup table containing all of the words and
	 *                 word forms from the dictionary.
	 */
_parseDIC:function(e){function t(e,t){
// Some dictionaries will list the same word multiple times with different rule sets.
r.hasOwnProperty(e)||(r[e]=null),t.length>0&&(null===r[e]&&(r[e]=[]),r[e].push(t))}e=this._removeDicComments(e);
// The first line is the number of words in the dictionary.
for(var n=e.split("\n"),r={},i=1,o=n.length;i<o;i++){var a=n[i],s=a.split("/",2),l=s[0];
// Now for each affix rule, generate that form of the word.
if(s.length>1){var u=this.parseRuleCodes(s[1]);
// Save the ruleCodes for compound word situations.
"NEEDAFFIX"in this.flags&&-1!=u.indexOf(this.flags.NEEDAFFIX)||t(l,u);for(var c=0,f=u.length;c<f;c++){var d=u[c],p=this.rules[d];if(p)for(var h=this._applyRule(l,p),g=0,m=h.length;g<m;g++){var v=h[g];if(t(v,[]),p.combineable)for(var y=c+1;y<f;y++){var b=u[y],w=this.rules[b];if(w&&w.combineable&&p.type!=w.type)for(var k=this._applyRule(v,w),_=0,S=k.length;_<S;_++){var x=k[_];t(x,[])}}}d in this.compoundRuleCodes&&this.compoundRuleCodes[d].push(l)}}else t(l.trim(),[])}return r},/**
	 * Removes comment lines and then cleans up blank lines and trailing whitespace.
	 *
	 * @param {String} data The data from a .dic file.
	 * @return {String} The cleaned-up data.
	 */
_removeDicComments:function(e){
// I can't find any official documentation on it, but at least the de_DE
// dictionary uses tab-indented lines as comments.
// Remove comments
return e=e.replace(/^\t.*$/gm,"")},parseRuleCodes:function(e){if(!e)return[];if(!("FLAG"in this.flags))return e.split("");if("long"===this.flags.FLAG){for(var t=[],n=0,r=e.length;n<r;n+=2)t.push(e.substr(n,2));return t}return"num"===this.flags.FLAG?e.split(","):void 0},/**
	 * Applies an affix rule to a word.
	 *
	 * @param {String} word The base word.
	 * @param {Object} rule The affix rule.
	 * @returns {String[]} The new words generated by the rule.
	 */
_applyRule:function(e,t){for(var n=t.entries,r=[],i=0,o=n.length;i<o;i++){var a=n[i];if(!a.match||e.match(a.match)){var s=e;if(a.remove&&(s=s.replace(a.remove,"")),"SFX"===t.type?s+=a.add:s=a.add+s,r.push(s),"continuationClasses"in a)for(var l=0,u=a.continuationClasses.length;l<u;l++){var c=this.rules[a.continuationClasses[l]];c&&(r=r.concat(this._applyRule(s,c)))}}}return r},/**
	 * Checks whether a word or a capitalization variant exists in the current dictionary.
	 * The word is trimmed and several variations of capitalizations are checked.
	 * If you want to check a word without any changes made to it, call checkExact()
	 *
	 * @see http://blog.stevenlevithan.com/archives/faster-trim-javascript re:trimming function
	 *
	 * @param {String} aWord The word to check.
	 * @returns {Boolean}
	 */
check:function(e){if(!this.loaded)throw"Dictionary not loaded.";
// Remove leading and trailing whitespace
var t=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if(this.checkExact(t))return!0;
// The exact word is not in the dictionary.
if(t.toUpperCase()===t){
// The word was supplied in all uppercase.
// Check for a capitalized form of the word.
var n=t[0]+t.substring(1).toLowerCase();if(this.hasFlag(n,"KEEPCASE"))
// Capitalization variants are not allowed for this word.
return!1;if(this.checkExact(n))return!0}var r=t.toLowerCase();if(r!==t){if(this.hasFlag(r,"KEEPCASE"))
// Capitalization variants are not allowed for this word.
return!1;
// Check for a lowercase form
if(this.checkExact(r))return!0}return!1},/**
	 * Checks whether a word exists in the current dictionary.
	 *
	 * @param {String} word The word to check.
	 * @returns {Boolean}
	 */
checkExact:function(e){if(!this.loaded)throw"Dictionary not loaded.";var t,n,r=this.dictionaryTable[e];if(void 0===r){
// Check if this might be a compound word.
if("COMPOUNDMIN"in this.flags&&e.length>=this.flags.COMPOUNDMIN)for(t=0,n=this.compoundRules.length;t<n;t++)if(e.match(this.compoundRules[t]))return!0}else{if(null===r)
// a null (but not undefined) value for an entry in the dictionary table
// means that the word is in the dictionary but has no flags.
return!0;if("object"==typeof r)// this.dictionary['hasOwnProperty'] will be a function.
for(t=0,n=r.length;t<n;t++)if(!this.hasFlag(e,"ONLYINCOMPOUND",r[t]))return!0}return!1},/**
	 * Looks up whether a given word is flagged with a given flag.
	 *
	 * @param {String} word The word in question.
	 * @param {String} flag The flag in question.
	 * @return {Boolean}
	 */
hasFlag:function(e,t,n){if(!this.loaded)throw"Dictionary not loaded.";return!!(t in this.flags&&(void 0===n&&(n=Array.prototype.concat.apply([],this.dictionaryTable[e])),n&&-1!==n.indexOf(this.flags[t])))},/**
	 * Returns a list of suggestions for a misspelled word.
	 *
	 * @see http://www.norvig.com/spell-correct.html for the basis of this suggestor.
	 * This suggestor is primitive, but it works.
	 *
	 * @param {String} word The misspelling.
	 * @param {Number} [limit=5] The maximum number of suggestions to return.
	 * @returns {String[]} The array of suggestions.
	 */
alphabet:"",suggest:function(e,t){/*
		if (!self.alphabet) {
			// Use the alphabet as implicitly defined by the words in the dictionary.
			var alphaHash = {};
			
			for (var i in self.dictionaryTable) {
				for (var j = 0, _len = i.length; j < _len; j++) {
					alphaHash[i[j]] = true;
				}
			}
			
			for (var i in alphaHash) {
				self.alphabet += i;
			}
			
			var alphaArray = self.alphabet.split("");
			alphaArray.sort();
			self.alphabet = alphaArray.join("");
		}
		*/
function n(e){var t,n,r,i,o,a,s=[];for(t=0,i=e.length;t<i;t++){var l=e[t];for(n=0,o=l.length+1;n<o;n++){var c=[l.substring(0,n),l.substring(n)];if(c[1]&&s.push(c[0]+c[1].substring(1)),
// Eliminate transpositions of identical letters
c[1].length>1&&c[1][1]!==c[1][0]&&s.push(c[0]+c[1][1]+c[1][0]+c[1].substring(2)),c[1])for(r=0,a=u.alphabet.length;r<a;r++)
// Eliminate replacement of a letter by itself
u.alphabet[r]!=c[1].substring(0,1)&&s.push(c[0]+u.alphabet[r]+c[1].substring(1));if(c[1])for(r=0,a=u.alphabet.length;r<a;r++)s.push(c[0]+u.alphabet[r]+c[1])}}return s}function r(e){for(var t=[],n=0,r=e.length;n<r;n++)u.check(e[n])&&t.push(e[n]);return t}if(!this.loaded)throw"Dictionary not loaded.";if(t=t||5,this.memoized.hasOwnProperty(e)){var i=this.memoized[e].limit;
// Only return the cached list if it's big enough or if there weren't enough suggestions
// to fill a smaller limit.
if(t<=i||this.memoized[e].suggestions.length<i)return this.memoized[e].suggestions.slice(0,t)}if(this.check(e))return[];
// Check the replacement table.
for(var o=0,a=this.replacementTable.length;o<a;o++){var s=this.replacementTable[o];if(-1!==e.indexOf(s[0])){var l=e.replace(s[0],s[1]);if(this.check(l))return[l]}}var u=this;return u.alphabet="abcdefghijklmnopqrstuvwxyz",this.memoized[e]={suggestions:function(e){function i(e,t){return e[1]<t[1]?-1:1}
// Get the edit-distance-1 and edit-distance-2 forms of this word.
var o,a,s=n([e]),l=n(s),c=r(s.concat(l)),f={};for(o=0,a=c.length;o<a;o++)c[o]in f?f[c[o]]+=1:f[c[o]]=1;var d=[];for(o in f)f.hasOwnProperty(o)&&d.push([o,f[o]]);d.sort(i).reverse();var p=[],h="lowercase";for(e.toUpperCase()===e?h="uppercase":e.substr(0,1).toUpperCase()+e.substr(1).toLowerCase()===e&&(h="capitalized"),o=0,a=Math.min(t,d.length);o<a;o++)"uppercase"===h?d[o][0]=d[o][0].toUpperCase():"capitalized"===h&&(d[o][0]=d[o][0].substr(0,1).toUpperCase()+d[o][0].substr(1)),u.hasFlag(d[o][0],"NOSUGGEST")||p.push(d[o][0]);return p}(e),limit:t},this.memoized[e].suggestions}}}(),e.exports=i}).call(t,"/",n("7xR8").Buffer)},/***/
"0Rdu":/***/
function(e,t,n){var r;!function(i){"use strict";/*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
function o(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}/*
  * Bitwise rotate a 32-bit number to the left.
  */
function a(e,t){return e<<t|e>>>32-t}/*
  * These functions implement the four basic operations the algorithm uses.
  */
function s(e,t,n,r,i,s){return o(a(o(o(t,e),o(r,s)),i),n)}function l(e,t,n,r,i,o,a){return s(t&n|~t&r,e,t,i,o,a)}function u(e,t,n,r,i,o,a){return s(t&r|n&~r,e,t,i,o,a)}function c(e,t,n,r,i,o,a){return s(t^n^r,e,t,i,o,a)}function f(e,t,n,r,i,o,a){return s(n^(t|~r),e,t,i,o,a)}/*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
function d(e,t){/* append padding */
e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var n,r,i,a,s,d=1732584193,p=-271733879,h=-1732584194,g=271733878;for(n=0;n<e.length;n+=16)r=d,i=p,a=h,s=g,d=l(d,p,h,g,e[n],7,-680876936),g=l(g,d,p,h,e[n+1],12,-389564586),h=l(h,g,d,p,e[n+2],17,606105819),p=l(p,h,g,d,e[n+3],22,-1044525330),d=l(d,p,h,g,e[n+4],7,-176418897),g=l(g,d,p,h,e[n+5],12,1200080426),h=l(h,g,d,p,e[n+6],17,-1473231341),p=l(p,h,g,d,e[n+7],22,-45705983),d=l(d,p,h,g,e[n+8],7,1770035416),g=l(g,d,p,h,e[n+9],12,-1958414417),h=l(h,g,d,p,e[n+10],17,-42063),p=l(p,h,g,d,e[n+11],22,-1990404162),d=l(d,p,h,g,e[n+12],7,1804603682),g=l(g,d,p,h,e[n+13],12,-40341101),h=l(h,g,d,p,e[n+14],17,-1502002290),p=l(p,h,g,d,e[n+15],22,1236535329),d=u(d,p,h,g,e[n+1],5,-165796510),g=u(g,d,p,h,e[n+6],9,-1069501632),h=u(h,g,d,p,e[n+11],14,643717713),p=u(p,h,g,d,e[n],20,-373897302),d=u(d,p,h,g,e[n+5],5,-701558691),g=u(g,d,p,h,e[n+10],9,38016083),h=u(h,g,d,p,e[n+15],14,-660478335),p=u(p,h,g,d,e[n+4],20,-405537848),d=u(d,p,h,g,e[n+9],5,568446438),g=u(g,d,p,h,e[n+14],9,-1019803690),h=u(h,g,d,p,e[n+3],14,-187363961),p=u(p,h,g,d,e[n+8],20,1163531501),d=u(d,p,h,g,e[n+13],5,-1444681467),g=u(g,d,p,h,e[n+2],9,-51403784),h=u(h,g,d,p,e[n+7],14,1735328473),p=u(p,h,g,d,e[n+12],20,-1926607734),d=c(d,p,h,g,e[n+5],4,-378558),g=c(g,d,p,h,e[n+8],11,-2022574463),h=c(h,g,d,p,e[n+11],16,1839030562),p=c(p,h,g,d,e[n+14],23,-35309556),d=c(d,p,h,g,e[n+1],4,-1530992060),g=c(g,d,p,h,e[n+4],11,1272893353),h=c(h,g,d,p,e[n+7],16,-155497632),p=c(p,h,g,d,e[n+10],23,-1094730640),d=c(d,p,h,g,e[n+13],4,681279174),g=c(g,d,p,h,e[n],11,-358537222),h=c(h,g,d,p,e[n+3],16,-722521979),p=c(p,h,g,d,e[n+6],23,76029189),d=c(d,p,h,g,e[n+9],4,-640364487),g=c(g,d,p,h,e[n+12],11,-421815835),h=c(h,g,d,p,e[n+15],16,530742520),p=c(p,h,g,d,e[n+2],23,-995338651),d=f(d,p,h,g,e[n],6,-198630844),g=f(g,d,p,h,e[n+7],10,1126891415),h=f(h,g,d,p,e[n+14],15,-1416354905),p=f(p,h,g,d,e[n+5],21,-57434055),d=f(d,p,h,g,e[n+12],6,1700485571),g=f(g,d,p,h,e[n+3],10,-1894986606),h=f(h,g,d,p,e[n+10],15,-1051523),p=f(p,h,g,d,e[n+1],21,-2054922799),d=f(d,p,h,g,e[n+8],6,1873313359),g=f(g,d,p,h,e[n+15],10,-30611744),h=f(h,g,d,p,e[n+6],15,-1560198380),p=f(p,h,g,d,e[n+13],21,1309151649),d=f(d,p,h,g,e[n+4],6,-145523070),g=f(g,d,p,h,e[n+11],10,-1120210379),h=f(h,g,d,p,e[n+2],15,718787259),p=f(p,h,g,d,e[n+9],21,-343485551),d=o(d,r),p=o(p,i),h=o(h,a),g=o(g,s);return[d,p,h,g]}/*
  * Convert an array of little-endian words to a string
  */
function p(e){var t,n="",r=32*e.length;for(t=0;t<r;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}/*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
function h(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var r=8*e.length;for(t=0;t<r;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}/*
  * Calculate the MD5 of a raw string
  */
function g(e){return p(d(h(e),8*e.length))}/*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
function m(e,t){var n,r,i=h(e),o=[],a=[];for(o[15]=a[15]=void 0,i.length>16&&(i=d(i,8*e.length)),n=0;n<16;n+=1)o[n]=909522486^i[n],a[n]=1549556828^i[n];return r=d(o.concat(h(t)),512+8*t.length),p(d(a.concat(r),640))}/*
  * Convert a raw string to a hex string
  */
function v(e){var t,n,r="0123456789abcdef",i="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),i+=r.charAt(t>>>4&15)+r.charAt(15&t);return i}/*
  * Encode a string as utf-8
  */
function y(e){return unescape(encodeURIComponent(e))}/*
  * Take string arguments and return either raw or hex encoded strings
  */
function b(e){return g(y(e))}function w(e){return v(b(e))}function k(e,t){return m(y(e),y(t))}function _(e,t){return v(k(e,t))}function S(e,t,n){return t?n?k(t,e):_(t,e):n?b(e):w(e)}void 0!==(r=function(){return S}.call(t,n,t,e))&&(e.exports=r)}()},/***/
"5RIO":/***/
function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},/***/
"7xR8":/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function r(){return o.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(e,t){if(r()<t)throw new RangeError("Invalid typed array length");
// Return an augmented `Uint8Array` instance, for best performance
// Fallback: Return an object instance of the Buffer class
return o.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t),e.__proto__=o.prototype):(null===e&&(e=new o(t)),e.length=t),e}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function o(e,t,n){if(!(o.TYPED_ARRAY_SUPPORT||this instanceof o))return new o(e,t,n);
// Common case.
if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return u(this,e)}return a(this,e,t,n)}function a(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?d(e,t,n,r):"string"==typeof t?c(e,t,n):p(e,t)}function s(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function l(e,t,n,r){return s(t),t<=0?i(e,t):void 0!==n?"string"==typeof r?i(e,t).fill(n,r):i(e,t).fill(n):i(e,t)}function u(e,t){if(s(t),e=i(e,t<0?0:0|h(t)),!o.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function c(e,t,n){if("string"==typeof n&&""!==n||(n="utf8"),!o.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|m(t,n);e=i(e,r);var a=e.write(t,n);
// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
return a!==r&&(e=e.slice(0,a)),e}function f(e,t){var n=t.length<0?0:0|h(t.length);e=i(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function d(e,t,n,r){// this throws if `array` is not a valid ArrayBuffer
if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");
// Return an augmented `Uint8Array` instance, for best performance
// Fallback: Return an object instance of the Buffer class
return t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r),o.TYPED_ARRAY_SUPPORT?(e=t,e.__proto__=o.prototype):e=f(e,t),e}function p(e,t){if(o.isBuffer(t)){var n=0|h(t.length);return e=i(e,n),0===e.length?e:(t.copy(e,0,0,n),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||X(t.length)?i(e,0):f(e,t);if("Buffer"===t.type&&K(t.data))return f(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function h(e){
// Note: cannot use `length < kMaxLength()` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(e>=r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r().toString(16)+" bytes");return 0|e}function g(e){// eslint-disable-line eqeqeq
return+e!=e&&(e=0),o.alloc(+e)}function m(e,t){if(o.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(
// Use a for loop to avoid recursion
var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Y(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return $(e).length;default:if(r)return Y(e).length;// assume utf8
t=(""+t).toLowerCase(),r=!0}}function v(e,t,n){var r=!1;
// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if(
// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
(void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(
// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
n>>>=0,t>>>=0,n<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return M(this,t,n);case"utf8":case"utf-8":return A(this,t,n);case"ascii":return O(this,t,n);case"latin1":case"binary":return R(this,t,n);case"base64":return E(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return N(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function y(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function b(e,t,n,r,i){
// Empty buffer means no match
if(0===e.length)return-1;if(
// Normalize byteOffset
"string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,// Coerce to Number.
isNaN(n)&&(
// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
n=i?0:e.length-1),
// Normalize byteOffset: negative offsets start from the end of the buffer
n<0&&(n=e.length+n),n>=e.length){if(i)return-1;n=e.length-1}else if(n<0){if(!i)return-1;n=0}
// Finally, search either indexOf (if dir is true) or lastIndexOf
if(
// Normalize val
"string"==typeof t&&(t=o.from(t,r)),o.isBuffer(t))
// Special case: looking for empty string/buffer always fails
// Special case: looking for empty string/buffer always fails
return 0===t.length?-1:w(e,t,n,r,i);if("number"==typeof t)// Search for a byte value [0-255]
// Search for a byte value [0-255]
return t&=255,o.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):w(e,[t],n,r,i);throw new TypeError("val must be string, number or Buffer")}function w(e,t,n,r,i){function o(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}var a=1,s=e.length,l=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;a=2,s/=2,l/=2,n/=2}var u;if(i){var c=-1;for(u=n;u<s;u++)if(o(e,u)===o(t,-1===c?0:u-c)){if(-1===c&&(c=u),u-c+1===l)return c*a}else-1!==c&&(u-=u-c),c=-1}else for(n+l>s&&(n=s-l),u=n;u>=0;u--){for(var f=!0,d=0;d<l;d++)if(o(e,u+d)!==o(t,d)){f=!1;break}if(f)return u}return-1}function k(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r))>i&&(r=i):r=i;
// must be an even number of digits
var o=t.length;if(o%2!=0)throw new TypeError("Invalid hex string");r>o/2&&(r=o/2);for(var a=0;a<r;++a){var s=parseInt(t.substr(2*a,2),16);if(isNaN(s))return a;e[n+a]=s}return a}function _(e,t,n,r){return G(Y(t,e.length-n),e,n,r)}function S(e,t,n,r){return G(W(t),e,n,r)}function x(e,t,n,r){return S(e,t,n,r)}function T(e,t,n,r){return G($(t),e,n,r)}function C(e,t,n,r){return G(V(t,e.length-n),e,n,r)}function E(e,t,n){return 0===t&&n===e.length?Z.fromByteArray(e):Z.fromByteArray(e.slice(t,n))}function A(e,t,n){n=Math.min(e.length,n);for(var r=[],i=t;i<n;){var o=e[i],a=null,s=o>239?4:o>223?3:o>191?2:1;if(i+s<=n){var l,u,c,f;switch(s){case 1:o<128&&(a=o);break;case 2:l=e[i+1],128==(192&l)&&(f=(31&o)<<6|63&l)>127&&(a=f);break;case 3:l=e[i+1],u=e[i+2],128==(192&l)&&128==(192&u)&&(f=(15&o)<<12|(63&l)<<6|63&u)>2047&&(f<55296||f>57343)&&(a=f);break;case 4:l=e[i+1],u=e[i+2],c=e[i+3],128==(192&l)&&128==(192&u)&&128==(192&c)&&(f=(15&o)<<18|(63&l)<<12|(63&u)<<6|63&c)>65535&&f<1114112&&(a=f)}}null===a?(
// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
a=65533,s=1):a>65535&&(
// encode to utf16 (surrogate pair dance)
a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),i+=s}return P(r)}function P(e){var t=e.length;if(t<=Q)return String.fromCharCode.apply(String,e);for(
// Decode in chunks to avoid "call stack size exceeded".
var n="",r=0;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=Q));return n}function O(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(127&e[i]);return r}function R(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(e[i]);return r}function M(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var i="",o=t;o<n;++o)i+=H(e[o]);return i}function N(e,t,n){for(var r=e.slice(t,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function L(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function I(e,t,n,r,i,a){if(!o.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<a)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function U(e,t,n,r){t<0&&(t=65535+t+1);for(var i=0,o=Math.min(e.length-n,2);i<o;++i)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function j(e,t,n,r){t<0&&(t=4294967295+t+1);for(var i=0,o=Math.min(e.length-n,4);i<o;++i)e[n+i]=t>>>8*(r?i:3-i)&255}function B(e,t,n,r,i,o){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function q(e,t,n,r,i){return i||B(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),J.write(e,t,n,r,23,4),n+4}function F(e,t,n,r,i){return i||B(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),J.write(e,t,n,r,52,8),n+8}function D(e){
// Node converts strings with length < 2 to ''
if(
// Node strips out invalid characters like \n and \t from the string, base64-js does not
e=z(e).replace(ee,""),e.length<2)return"";
// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;e.length%4!=0;)e+="=";return e}function z(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function Y(e,t){t=t||1/0;for(var n,r=e.length,i=null,o=[],a=0;a<r;++a){
// is surrogate component
if((n=e.charCodeAt(a))>55295&&n<57344){
// last char was a lead
if(!i){
// no lead yet
if(n>56319){
// unexpected trail
(t-=3)>-1&&o.push(239,191,189);continue}if(a+1===r){
// unpaired lead
(t-=3)>-1&&o.push(239,191,189);continue}
// valid lead
i=n;continue}
// 2 leads in a row
if(n<56320){(t-=3)>-1&&o.push(239,191,189),i=n;continue}
// valid surrogate pair
n=65536+(i-55296<<10|n-56320)}else i&&(t-=3)>-1&&o.push(239,191,189);
// encode utf8
if(i=null,n<128){if((t-=1)<0)break;o.push(n)}else if(n<2048){if((t-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function W(e){for(var t=[],n=0;n<e.length;++n)
// Node's code seems to be doing this and not & 0x7F..
t.push(255&e.charCodeAt(n));return t}function V(e,t){for(var n,r,i,o=[],a=0;a<e.length&&!((t-=2)<0);++a)n=e.charCodeAt(a),r=n>>8,i=n%256,o.push(i),o.push(r);return o}function $(e){return Z.toByteArray(D(e))}function G(e,t,n,r){for(var i=0;i<r&&!(i+n>=t.length||i>=e.length);++i)t[i+n]=e[i];return i}function X(e){return e!==e}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */
var Z=n("/eEn"),J=n("OId0"),K=n("5RIO");t.Buffer=o,t.SlowBuffer=g,t.INSPECT_MAX_BYTES=50,/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
o.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);// typed array instances can be augmented
// chrome 9-10 lack `subarray`
return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),/*
 * Export kMaxLength after typed array support is determined.
 */
t.kMaxLength=r(),o.poolSize=8192,// not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.
o._augment=function(e){return e.__proto__=o.prototype,e},/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
o.from=function(e,t,n){return a(null,e,t,n)},o.TYPED_ARRAY_SUPPORT&&(o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&
// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
Object.defineProperty(o,Symbol.species,{value:null,configurable:!0})),/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
o.alloc=function(e,t,n){return l(null,e,t,n)},/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
o.allocUnsafe=function(e){return u(null,e)},/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
o.allocUnsafeSlow=function(e){return u(null,e)},o.isBuffer=function(e){return!(null==e||!e._isBuffer)},o.compare=function(e,t){if(!o.isBuffer(e)||!o.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,i=0,a=Math.min(n,r);i<a;++i)if(e[i]!==t[i]){n=e[i],r=t[i];break}return n<r?-1:r<n?1:0},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,t){if(!K(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return o.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=o.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){var a=e[n];if(!o.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(r,i),i+=a.length}return r},o.byteLength=m,
// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
o.prototype._isBuffer=!0,o.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)y(this,t,t+1);return this},o.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)y(this,t,t+3),y(this,t+1,t+2);return this},o.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)y(this,t,t+7),y(this,t+1,t+6),y(this,t+2,t+5),y(this,t+3,t+4);return this},o.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?A(this,0,e):v.apply(this,arguments)},o.prototype.equals=function(e){if(!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===o.compare(this,e)},o.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},o.prototype.compare=function(e,t,n,r,i){if(!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,i>>>=0,this===e)return 0;for(var a=i-r,s=n-t,l=Math.min(a,s),u=this.slice(r,i),c=e.slice(t,n),f=0;f<l;++f)if(u[f]!==c[f]){a=u[f],s=c[f];break}return a<s?-1:s<a?1:0},o.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},o.prototype.indexOf=function(e,t,n){return b(this,e,t,n,!0)},o.prototype.lastIndexOf=function(e,t,n){return b(this,e,t,n,!1)},o.prototype.write=function(e,t,n,r){
// Buffer#write(string)
if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var i=this.length-t;if((void 0===n||n>i)&&(n=i),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var o=!1;;)switch(r){case"hex":return k(this,e,t,n);case"utf8":case"utf-8":return _(this,e,t,n);case"ascii":return S(this,e,t,n);case"latin1":case"binary":return x(this,e,t,n);case"base64":
// Warning: maxLength not taken into account in base64Write
return T(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,e,t,n);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),o=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var Q=4096;o.prototype.slice=function(e,t){var n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e);var r;if(o.TYPED_ARRAY_SUPPORT)r=this.subarray(e,t),r.__proto__=o.prototype;else{var i=t-e;r=new o(i,void 0);for(var a=0;a<i;++a)r[a]=this[a+e]}return r},o.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||L(e,t,this.length);for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i;return r},o.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||L(e,t,this.length);for(var r=this[e+--t],i=1;t>0&&(i*=256);)r+=this[e+--t]*i;return r},o.prototype.readUInt8=function(e,t){return t||L(e,1,this.length),this[e]},o.prototype.readUInt16LE=function(e,t){return t||L(e,2,this.length),this[e]|this[e+1]<<8},o.prototype.readUInt16BE=function(e,t){return t||L(e,2,this.length),this[e]<<8|this[e+1]},o.prototype.readUInt32LE=function(e,t){return t||L(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},o.prototype.readUInt32BE=function(e,t){return t||L(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},o.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||L(e,t,this.length);for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i;return i*=128,r>=i&&(r-=Math.pow(2,8*t)),r},o.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||L(e,t,this.length);for(var r=t,i=1,o=this[e+--r];r>0&&(i*=256);)o+=this[e+--r]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*t)),o},o.prototype.readInt8=function(e,t){return t||L(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},o.prototype.readInt16LE=function(e,t){t||L(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},o.prototype.readInt16BE=function(e,t){t||L(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},o.prototype.readInt32LE=function(e,t){return t||L(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},o.prototype.readInt32BE=function(e,t){return t||L(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},o.prototype.readFloatLE=function(e,t){return t||L(e,4,this.length),J.read(this,e,!0,23,4)},o.prototype.readFloatBE=function(e,t){return t||L(e,4,this.length),J.read(this,e,!1,23,4)},o.prototype.readDoubleLE=function(e,t){return t||L(e,8,this.length),J.read(this,e,!0,52,8)},o.prototype.readDoubleBE=function(e,t){return t||L(e,8,this.length),J.read(this,e,!1,52,8)},o.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t|=0,n|=0,!r){I(this,e,t,n,Math.pow(2,8*n)-1,0)}var i=1,o=0;for(this[t]=255&e;++o<n&&(i*=256);)this[t+o]=e/i&255;return t+n},o.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t|=0,n|=0,!r){I(this,e,t,n,Math.pow(2,8*n)-1,0)}var i=n-1,o=1;for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255;return t+n},o.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,1,255,0),o.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},o.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):U(this,e,t,!0),t+2},o.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):U(this,e,t,!1),t+2},o.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):j(this,e,t,!0),t+4},o.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):j(this,e,t,!1),t+4},o.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);I(this,e,t,n,i-1,-i)}var o=0,a=1,s=0;for(this[t]=255&e;++o<n&&(a*=256);)e<0&&0===s&&0!==this[t+o-1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+n},o.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);I(this,e,t,n,i-1,-i)}var o=n-1,a=1,s=0;for(this[t+o]=255&e;--o>=0&&(a*=256);)e<0&&0===s&&0!==this[t+o+1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+n},o.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,1,127,-128),o.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},o.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):U(this,e,t,!0),t+2},o.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):U(this,e,t,!1),t+2},o.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,4,2147483647,-2147483648),o.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):j(this,e,t,!0),t+4},o.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||I(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),o.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):j(this,e,t,!1),t+4},o.prototype.writeFloatLE=function(e,t,n){return q(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){return q(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){return F(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){return F(this,e,t,!1,n)},
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
o.prototype.copy=function(e,t,n,r){
// Copy 0 bytes; we're done
if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;
// Fatal error conditions
if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");
// Are we oob?
r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var i,a=r-n;if(this===e&&n<t&&t<r)
// descending copy from end
for(i=a-1;i>=0;--i)e[i+t]=this[i+n];else if(a<1e3||!o.TYPED_ARRAY_SUPPORT)
// ascending copy from start
for(i=0;i<a;++i)e[i+t]=this[i+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+a),t);return a},
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
o.prototype.fill=function(e,t,n,r){
// Handle string cases:
if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!o.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);
// Invalid ranges are not set to a default, so can range check early.
if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0);var a;if("number"==typeof e)for(a=t;a<n;++a)this[a]=e;else{var s=o.isBuffer(e)?e:Y(new o(e,r).toString()),l=s.length;for(a=0;a<n-t;++a)this[a+t]=s[a%l]}return this};
// HELPER FUNCTIONS
// ================
var ee=/[^+\/0-9A-Za-z-_]/g}).call(t,n("Gkk9"))},/***/
DZG7:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
!function(e){// CommonJS
e(n("U66f"))}(function(e){function t(e){e.state.placeholder&&(e.state.placeholder.parentNode.removeChild(e.state.placeholder),e.state.placeholder=null)}function n(e){t(e);var n=e.state.placeholder=document.createElement("pre");n.style.cssText="height: 0; overflow: visible",n.className="CodeMirror-placeholder";var r=e.getOption("placeholder");"string"==typeof r&&(r=document.createTextNode(r)),n.appendChild(r),e.display.lineSpace.insertBefore(n,e.display.lineSpace.firstChild)}function r(e){o(e)&&n(e)}function i(e){var r=e.getWrapperElement(),i=o(e);r.className=r.className.replace(" CodeMirror-empty","")+(i?" CodeMirror-empty":""),i?n(e):t(e)}function o(e){return 1===e.lineCount()&&""===e.getLine(0)}e.defineOption("placeholder","",function(n,o,a){var s=a&&a!=e.Init;if(o&&!s)n.on("blur",r),n.on("change",i),n.on("swapDoc",i),i(n);else if(!o&&s){n.off("blur",r),n.off("change",i),n.off("swapDoc",i),t(n);var l=n.getWrapperElement();l.className=l.className.replace(" CodeMirror-empty","")}o&&!n.hasFocus()&&r(n)})})},/***/
E4C3:/***/
function(e,t,n){var r,i;!function(o,a){r=a,void 0!==(i="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=i)}(0,function(){/**
   * Helpers
   */
function e(e,t,n){return e<t?t:e>n?n:e}/**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */
function t(e){return 100*(-1+e)}/**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */
function n(e,n,r){var i;return i="translate3d"===u.positionUsing?{transform:"translate3d("+t(e)+"%,0,0)"}:"translate"===u.positionUsing?{transform:"translate("+t(e)+"%,0)"}:{"margin-left":t(e)+"%"},i.transition="all "+n+"ms "+r,i}/**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */
function r(e,t){return("string"==typeof e?e:a(e)).indexOf(" "+t+" ")>=0}/**
   * (Internal) Adds a class to an element.
   */
function i(e,t){var n=a(e),i=n+t;r(n,t)||(
// Trim the opening space.
e.className=i.substring(1))}/**
   * (Internal) Removes a class from an element.
   */
function o(e,t){var n,i=a(e);r(e,t)&&(
// Replace the class name.
n=i.replace(" "+t+" "," "),
// Trim the opening and closing spaces.
e.className=n.substring(1,n.length-1))}/**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */
function a(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}/**
   * (Internal) Removes an element from the DOM.
   */
function s(e){e&&e.parentNode&&e.parentNode.removeChild(e)}var l={};l.version="0.2.0";var u=l.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};/**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
l.configure=function(e){var t,n;for(t in e)void 0!==(n=e[t])&&e.hasOwnProperty(t)&&(u[t]=n);return this},/**
   * Last number.
   */
l.status=null,/**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */
l.set=function(t){var r=l.isStarted();t=e(t,u.minimum,1),l.status=1===t?null:t;var i=l.render(!r),o=i.querySelector(u.barSelector),a=u.speed,s=u.easing;/* Repaint */
return i.offsetWidth,c(function(e){
// Set positionUsing if it hasn't already been set
""===u.positionUsing&&(u.positionUsing=l.getPositioningCSS()),
// Add transition
f(o,n(t,a,s)),1===t?(
// Fade out
f(i,{transition:"none",opacity:1}),i.offsetWidth,/* Repaint */
setTimeout(function(){f(i,{transition:"all "+a+"ms linear",opacity:0}),setTimeout(function(){l.remove(),e()},a)},a)):setTimeout(e,a)}),this},l.isStarted=function(){return"number"==typeof l.status},/**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
l.start=function(){l.status||l.set(0);var e=function(){setTimeout(function(){l.status&&(l.trickle(),e())},u.trickleSpeed)};return u.trickle&&e(),this},/**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */
l.done=function(e){return e||l.status?l.inc(.3+.5*Math.random()).set(1):this},/**
   * Increments by a random amount.
   */
l.inc=function(t){var n=l.status;return n?("number"!=typeof t&&(t=(1-n)*e(Math.random()*n,.1,.95)),n=e(n+t,0,.994),l.set(n)):l.start()},l.trickle=function(){return l.inc(Math.random()*u.trickleRate)},/**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
function(){var e=0,t=0;l.promise=function(n){return n&&"resolved"!==n.state()?(0===t&&l.start(),e++,t++,n.always(function(){t--,0===t?(e=0,l.done()):l.set((e-t)/e)}),this):this}}(),/**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */
l.render=function(e){if(l.isRendered())return document.getElementById("nprogress");i(document.documentElement,"nprogress-busy");var n=document.createElement("div");n.id="nprogress",n.innerHTML=u.template;var r,o=n.querySelector(u.barSelector),a=e?"-100":t(l.status||0),c=document.querySelector(u.parent);return f(o,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),u.showSpinner||(r=n.querySelector(u.spinnerSelector))&&s(r),c!=document.body&&i(c,"nprogress-custom-parent"),c.appendChild(n),n},/**
   * Removes the element. Opposite of render().
   */
l.remove=function(){o(document.documentElement,"nprogress-busy"),o(document.querySelector(u.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&s(e)},/**
   * Checks if the progress bar is rendered.
   */
l.isRendered=function(){return!!document.getElementById("nprogress")},/**
   * Determine which positioning CSS rule to use.
   */
l.getPositioningCSS=function(){
// Sniff on document.body.style
var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};/**
   * (Internal) Queues a function to be executed.
   */
var c=function(){function e(){var n=t.shift();n&&n(e)}var t=[];return function(n){t.push(n),1==t.length&&e()}}(),f=function(){function e(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(e,t){return t.toUpperCase()})}function t(e){var t=document.body.style;if(e in t)return e;for(var n,r=i.length,o=e.charAt(0).toUpperCase()+e.slice(1);r--;)if((n=i[r]+o)in t)return n;return e}function n(n){return n=e(n),o[n]||(o[n]=t(n))}function r(e,t,r){t=n(t),e.style[t]=r}var i=["Webkit","O","Moz","ms"],o={};return function(e,t){var n,i,o=arguments;if(2==o.length)for(n in t)void 0!==(i=t[n])&&t.hasOwnProperty(n)&&r(e,n,i);else r(e,o[1],o[2])}}();return l})},/***/
OId0:/***/
function(e,t){t.read=function(e,t,n,r,i){var o,a,s=8*i-r-1,l=(1<<s)-1,u=l>>1,c=-7,f=n?i-1:0,d=n?-1:1,p=e[t+f];for(f+=d,o=p&(1<<-c)-1,p>>=-c,c+=s;c>0;o=256*o+e[t+f],f+=d,c-=8);for(a=o&(1<<-c)-1,o>>=-c,c+=r;c>0;a=256*a+e[t+f],f+=d,c-=8);if(0===o)o=1-u;else{if(o===l)return a?NaN:1/0*(p?-1:1);a+=Math.pow(2,r),o-=u}return(p?-1:1)*a*Math.pow(2,o-r)},t.write=function(e,t,n,r,i,o){var a,s,l,u=8*o-i-1,c=(1<<u)-1,f=c>>1,d=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:o-1,h=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,a=c):(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1&&(a--,l*=2),t+=a+f>=1?d/l:d*Math.pow(2,1-f),t*l>=2&&(a++,l/=2),a+f>=c?(s=0,a=c):a+f>=1?(s=(t*l-1)*Math.pow(2,i),a+=f):(s=t*Math.pow(2,f-1)*Math.pow(2,i),a=0));i>=8;e[n+p]=255&s,p+=h,s/=256,i-=8);for(a=a<<i|s,u+=i;u>0;e[n+p]=255&a,p+=h,a/=256,u-=8);e[n+p-h]|=128*g}},/***/
Tj9T:/***/
function(e,t,n){"use strict";
// Create function
function r(e){
// Verify
if(
// Initialize
e=e||{},"function"!=typeof e.codeMirrorInstance||"function"!=typeof e.codeMirrorInstance.defineMode)return void console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`");
// Because some browsers don't support this functionality yet
String.prototype.includes||(String.prototype.includes=function(){return-1!==String.prototype.indexOf.apply(this,arguments)}),
// Define the new mode
e.codeMirrorInstance.defineMode("spell-checker",function(t){
// Load AFF/DIC data
if(!r.aff_loading){r.aff_loading=!0;var n=new XMLHttpRequest;n.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff",!0),n.onload=function(){4===n.readyState&&200===n.status&&(r.aff_data=n.responseText,2==++r.num_loaded&&(r.typo=new i("en_US",r.aff_data,r.dic_data,{platform:"any"})))},n.send(null)}if(!r.dic_loading){r.dic_loading=!0;var o=new XMLHttpRequest;o.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic",!0),o.onload=function(){4===o.readyState&&200===o.status&&(r.dic_data=o.responseText,2==++r.num_loaded&&(r.typo=new i("en_US",r.aff_data,r.dic_data,{platform:"any"})))},o.send(null)}
// Define what separates a word
var a='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',s={token:function(e){var t=e.peek(),n="";if(a.includes(t))return e.next(),null;for(;null!=(t=e.peek())&&!a.includes(t);)n+=t,e.next();return r.typo&&!r.typo.check(n)?"spell-error":null}},l=e.codeMirrorInstance.getMode(t,t.backdrop||"text/plain");return e.codeMirrorInstance.overlayMode(l,s,!0)})}
// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
// Requires
var i=n("0ISM");
// Initialize data globally to reduce memory consumption
r.num_loaded=0,r.aff_loading=!1,r.dic_loading=!1,r.aff_data="",r.dic_data="",r.typo,
// Export
e.exports=r},/***/
Tktu:/***/
function(e,t){/*jslint newcap: true */
/*global inlineAttachment: false */
/**
 * CodeMirror version for inlineAttachment
 *
 * Call inlineAttachment.attach(editor) to attach to a codemirror instance
 */
!function(){"use strict";var e=function(e){if(!e.getWrapperElement)throw"Invalid CodeMirror object given";this.codeMirror=e};e.prototype.getValue=function(){return this.codeMirror.getValue()},e.prototype.insertValue=function(e){this.codeMirror.replaceSelection(e)},e.prototype.setValue=function(e){var t=this.codeMirror.getCursor();this.codeMirror.setValue(e),this.codeMirror.setCursor(t)},/**
   * Attach InlineAttachment to CodeMirror
   *
   * @param {CodeMirror} codeMirror
   */
e.attach=function(t,n){n=n||{};var r=new e(t),i=new inlineAttachment(n,r);t.getWrapperElement().addEventListener("paste",function(e){i.onPaste(e)},!1),t.setOption("onDragEvent",function(e,t){if("drop"===t.type)return t.stopPropagation(),t.preventDefault(),i.onDrop(t)})};var t=function(t){e.call(this,t)};t.attach=function(t,n){n=n||{};var r=new e(t),i=new inlineAttachment(n,r);t.getWrapperElement().addEventListener("paste",function(e){i.onPaste(e)},!1),t.on("drop",function(e,t){return!!i.onDrop(t)&&(t.stopPropagation(),t.preventDefault(),!0)})},inlineAttachment.editors.codemirror4=t}()},/***/
VQun:/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function t(e){return e&&e.__esModule?e:{default:e}}n("6vhR");var r=n("eh2P"),i=t(r),o=n("iSXR"),a=t(o),s=n("E4C3"),l=t(s);n("2SKx");var u=n("wGMW"),c=t(u),f=n("Jov0"),d=t(f),p=n("b1yq"),h=n("mueN"),g=t(h),m=n("ylcc"),v=t(m),y=n("ZrRS"),b=t(y),w=n("N4UN"),k=t(w),_=n("0Rdu"),S=t(_),x=e("#book-details");x.length>0&&function(e){function t(){var t=x.find('[data-role="add-chapter"]'),n=(0,g.default)(t);t.on("click",function(){if(n.isDisabled())return!1;n.lock(),d.default.dialog.inputs(Translator.trans("book.chapter_name"),[{name:"title",required:!0}],{messages:{title:{required:Translator.trans("book.required_chapter_name")}}},{okValue:Translator.trans("ui.create"),cancelValue:Translator.trans("ui.cancel"),width:350}).then(function(e){console.log(e),d.default.request("book.add_summary",{slug:window.book.slug},e).done(function(){location.reload()}).fail(function(){d.default.dialog.message(Translator.trans("book.create_chapter_error")).flash()}),n.release()},function(){n.release()})}),x.find('[data-role="chapter"]').each(function(){var t=e(this),n=t.find('[data-role="edit"]'),r=(t.find('[data-role="add-sub"]'),t.find('[data-role="delete"]')),i=t.find('[data-role="move"]');n.on("click",function(){d.default.dialog.inputs(Translator.trans("book.chapter_name"),[{name:"title",default:t.data("title"),required:!0}],{messages:{title:{required:Translator.trans("book.required_chapter_name")}}},{okValue:Translator.trans("ui.create"),cancelValue:Translator.trans("ui.cancel"),width:350}).then(function(e){d.default.request("book.edit_summary",{slug:window.book.slug,id:t.data("id")},e).done(function(){location.reload()}).fail(function(){d.default.dialog.message(Translator.trans("book.edit_chapter_error")).flash()})},function(){})});var o=(0,g.default)(r);r.on("click",function(){if(o.isDisabled())return!1;o.lock(),d.default.dialog.confirm(Translator.trans("book.confirm_remove_chapter")).then(function(){var e=r.closest('[data-role="sub-chapter"]');0===e.length&&(e=r.closest('[data-role="chapter"]'));var t=e.data("id");d.default.request("post.delete",t).done(function(){d.default.dialog.message(Translator.trans("book.remove_success")).flash(function(){location.reload()})}).fail(function(){d.default.dialog.message(Translator.trans("book.remove_error")).flash()}).always(function(){o.release()})},function(){o.release()})});var a=(0,g.default)(i);i.on("click",function(){var t=e(this);if(a.isDisabled())return!1;a.lock();var n=t.closest('[data-role="sub-chapter"]');0===n.length&&(n=t.closest('[data-role="chapter"]'));var r=n.data("id");d.default.request("book.move_chapter",{slug:window.book.slug,id:r},{direction:e(this).data("direction")||"up",step:1}).done(function(){location.reload()}).fail(function(){d.default.dialog.message(Translator.trans("book.move_error")).flash()}).always(function(){a.release()})})})}new c.default(e("[data-pjax-container]"),{container:"#book-details",loader:"#loader",before:function(e){d.default.htmlPlaceholder(e)},success:function(e){new p.FollowUserIntialization(e),t()}}),t()}(e);
//添加章节
var T=document.getElementById("chapter_originalBody");e(T).length>0&&function(e){var t=e("#chapter_title"),n=e("#add-chapter-form"),r=e('[data-action="add-chapter"]'),i=new b.default({element:T,autofocus:!0,spellChecker:!1,status:!1,indentWithTabs:!1,tabSize:4,autosave:{enabled:!0,uniqueId:"chapter_"+(0,S.default)(location.pathname),delay:1e3},toolbar:["bold","italic","heading","|","quote","code","table","horizontal-rule","unordered-list","ordered-list","|","link","image","|","side-by-side","fullscreen","preview","|",{name:"guide",action:"https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md",className:"fa fa-info-circle",title:Translator.trans("editor.markdown_synax")}]});new v.default(i.codemirror),//处理附件上传的功能
r.on("click",function(){if(0===t.val().length)return d.default.dialog.message(Translator.trans("book.validation.name")).flash(),!1;var e=(0,g.default)(r).lock();return d.default.dialog.confirm(Translator.trans("book.confirm_publish")).then(function(){return n.submit(),!0},function(){return e.release(),!1}),!1}),
//添加文章验证
n.validate({rules:{"chapter[title]":{required:!0,rangelength:[2,50]}},messages:{"chapter[title]":{required:Translator.trans("book.chapter.validation.title.required"),rangelength:Translator.trans("book.chapter.validation.title.length_between")}}})}(e);
//电子书阅读页面
var C=e('[data-role="book-view"]');C.length>0&&function(e){var t=C.find('[data-role="summary"]');C.find('[data-role="toggle-summary"]').on("click",function(){C.toggleClass("with-summary")}),
//分享
new a.default(C.find('[data-role="social-share"]'),{theme:"dark-square",facebook:!1,twitter:!1}),
//代码高亮
e("pre code").each(function(e,t){i.default.highlightBlock(t)}),function(e){var n=e(document),r=t.find("li.chapter");e.pjax.defaults.timeout=5e4,e(document).pjax("ul.summary li a","#pjax-container"),n.on("pjax:start",function(){l.default.start()}),n.on("pjax:end",function(n){if(n.relatedTarget){var o=e(n.relatedTarget);r.removeClass("active"),t.find("li.sub-chapter-item").removeClass("active"),o.closest(".sub-chapter").length>0?o.closest(".sub-chapter-item").addClass("active"):o.closest(".chapter").addClass("active")}
//代码高亮
e("pre code").each(function(e,t){i.default.highlightBlock(t)}),l.default.done()})}(e);
//购买
var n=e('[data-role="buy"]');n.length>0&&function(){var e=(0,g.default)(n),t=n.data("slug");n.on("click",function(){var n=d.default.dialog.wait.ballPulse();d.default.request("category.follow",{slug:t}).done(function(e){if(e.require_payment)return void new k.default(e.qrcode);location.reload()}).fail(function(e){d.default.dialog.message(e.responseJSON.error).flash()}).always(function(){n.close(),e.release()})})}()}(e)}).call(t,n("9ZC0"))},/***/
WFpN:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
var r=n("U66f");r.commands.tabAndIndentMarkdownList=function(e){var t=e.listSelections(),n=t[0].head;if(!1!==e.getStateAfter(n.line).list)return void e.execCommand("indentMore");if(e.options.indentWithTabs)e.execCommand("insertTab");else{var r=Array(e.options.tabSize+1).join(" ");e.replaceSelection(r)}},r.commands.shiftTabAndUnindentMarkdownList=function(e){var t=e.listSelections(),n=t[0].head;if(!1!==e.getStateAfter(n.line).list)return void e.execCommand("indentLess");if(e.options.indentWithTabs)e.execCommand("insertTab");else{var r=Array(e.options.tabSize+1).join(" ");e.replaceSelection(r)}}},/***/
WSqq:/***/
function(e,t,n){/* WEBPACK VAR INJECTION */
(function(t){(function(){/**
 * Block Lexer
 */
function t(e){this.tokens=[],this.tokens.links={},this.options=e||c.defaults,this.rules=f.normal,this.options.gfm&&(this.options.tables?this.rules=f.tables:this.rules=f.gfm)}/**
 * Inline Lexer & Compiler
 */
function n(e,t){if(this.options=t||c.defaults,this.links=e,this.rules=d.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=d.breaks:this.rules=d.gfm:this.options.pedantic&&(this.rules=d.pedantic)}/**
 * Renderer
 */
function r(e){this.options=e||{}}/**
 * Parsing & Compiling
 */
function i(e){this.tokens=[],this.token=null,this.options=e||c.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}/**
 * Helpers
 */
function o(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function a(e){
// explicitly match decimal, hex, and named HTML entities 
return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function s(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)}}function l(){}function u(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}/**
 * Marked
 */
function c(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null),n=u({},c.defaults,n||{});var a,s,l=n.highlight,f=0;try{a=t.lex(e,n)}catch(e){return r(e)}s=a.length;var d=function(e){if(e)return n.highlight=l,r(e);var t;try{t=i.parse(a,n)}catch(t){e=t}return n.highlight=l,e?r(e):r(null,t)};if(!l||l.length<3)return d();if(delete n.highlight,!s)return d();for(;f<a.length;f++)!function(e){"code"!==e.type?--s||d():l(e.text,e.lang,function(t,n){return t?d(t):null==n||n===e.text?--s||d():(e.text=n,e.escaped=!0,void(--s||d()))})}(a[f])}else try{return n&&(n=u({},c.defaults,n)),i.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||c.defaults).silent)return"<p>An error occured:</p><pre>"+o(e.message+"",!0)+"</pre>";throw e}}/**
 * Block-Level Grammar
 */
var f={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:l,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:l,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:l,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};f.bullet=/(?:[*+-]|\d+\.)/,f.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,f.item=s(f.item,"gm")(/bull/g,f.bullet)(),f.list=s(f.list)(/bull/g,f.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+f.def.source+")")(),f.blockquote=s(f.blockquote)("def",f.def)(),f._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",f.html=s(f.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,f._tag)(),f.paragraph=s(f.paragraph)("hr",f.hr)("heading",f.heading)("lheading",f.lheading)("blockquote",f.blockquote)("tag","<"+f._tag)("def",f.def)(),/**
 * Normal Block Grammar
 */
f.normal=u({},f),/**
 * GFM Block Grammar
 */
f.gfm=u({},f.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),f.gfm.paragraph=s(f.paragraph)("(?!","(?!"+f.gfm.fences.source.replace("\\1","\\2")+"|"+f.list.source.replace("\\1","\\3")+"|")(),/**
 * GFM + Tables Block Grammar
 */
f.tables=u({},f.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),/**
 * Expose Block Rules
 */
t.rules=f,/**
 * Static Lex Method
 */
t.lex=function(e,n){return new t(n).lex(e)},/**
 * Preprocessing
 */
t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},/**
 * Lexing
 */
t.prototype.token=function(e,t,n){for(var r,i,o,a,s,l,u,c,d,e=e.replace(/^ +$/gm,"");e;)
// code
if(
// newline
(o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e))e=e.substring(o[0].length),o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?o:o.replace(/\n+$/,"")});else
// fences (gfm)
if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2],text:o[3]||""});else
// heading
if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else
// table no leading pipe (gfm)
if(t&&(o=this.rules.nptable.exec(e))){for(e=e.substring(o[0].length),l={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/\n$/,"").split("\n")},c=0;c<l.align.length;c++)/^ *-+: *$/.test(l.align[c])?l.align[c]="right":/^ *:-+: *$/.test(l.align[c])?l.align[c]="center":/^ *:-+ *$/.test(l.align[c])?l.align[c]="left":l.align[c]=null;for(c=0;c<l.cells.length;c++)l.cells[c]=l.cells[c].split(/ *\| */);this.tokens.push(l)}else
// lheading
if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2]?1:2,text:o[1]});else
// hr
if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else
// blockquote
if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),
// Pass `top` to keep the current
// "toplevel" state. This is exactly
// how markdown.pl works.
this.token(o,t,!0),this.tokens.push({type:"blockquote_end"});else
// list
if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),a=o[2],this.tokens.push({type:"list_start",ordered:a.length>1}),
// Get each top-level item.
o=o[0].match(this.rules.item),r=!1,d=o.length,c=0;c<d;c++)l=o[c],
// Remove the list item's bullet
// so it is seen as the next token.
u=l.length,l=l.replace(/^ *([*+-]|\d+\.) +/,""),
// Outdent whatever the
// list item contains. Hacky.
~l.indexOf("\n ")&&(u-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+u+"}","gm"),"")),
// Determine whether the next list item belongs here.
// Backpedal if it does not belong in this list.
this.options.smartLists&&c!==d-1&&(s=f.bullet.exec(o[c+1])[0],a===s||a.length>1&&s.length>1||(e=o.slice(c+1).join("\n")+e,c=d-1)),
// Determine whether item is loose or not.
// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
// for discount behavior.
i=r||/\n\n(?!\s*$)/.test(l),c!==d-1&&(r="\n"===l.charAt(l.length-1),i||(i=r)),this.tokens.push({type:i?"loose_item_start":"list_item_start"}),
// Recurse.
this.token(l,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else
// html
if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:o[0]});else
// def
if(!n&&t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),this.tokens.links[o[1].toLowerCase()]={href:o[2],title:o[3]};else
// table (gfm)
if(t&&(o=this.rules.table.exec(e))){for(e=e.substring(o[0].length),l={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/(?: *\| *)?\n$/,"").split("\n")},c=0;c<l.align.length;c++)/^ *-+: *$/.test(l.align[c])?l.align[c]="right":/^ *:-+: *$/.test(l.align[c])?l.align[c]="center":/^ *:-+ *$/.test(l.align[c])?l.align[c]="left":l.align[c]=null;for(c=0;c<l.cells.length;c++)l.cells[c]=l.cells[c].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(l)}else
// top-level paragraph
if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else
// text
if(o=this.rules.text.exec(e))
// Top-level should never reach here.
e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};/**
 * Inline-Level Grammar
 */
var d={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:l,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:l,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};d._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,d._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,d.link=s(d.link)("inside",d._inside)("href",d._href)(),d.reflink=s(d.reflink)("inside",d._inside)(),/**
 * Normal Inline Grammar
 */
d.normal=u({},d),/**
 * Pedantic Inline Grammar
 */
d.pedantic=u({},d.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),/**
 * GFM Inline Grammar
 */
d.gfm=u({},d.normal,{escape:s(d.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:s(d.text)("]|","~]|")("|","|https?://|")()}),/**
 * GFM + Line Breaks Inline Grammar
 */
d.breaks=u({},d.gfm,{br:s(d.br)("{2,}","*")(),text:s(d.gfm.text)("{2,}","*")()}),/**
 * Expose Inline Rules
 */
n.rules=d,/**
 * Static Lexing/Compiling Method
 */
n.output=function(e,t,r){return new n(t,r).output(e)},/**
 * Lexing/Compiling
 */
n.prototype.output=function(e){for(var t,n,r,i,a="";e;)
// escape
if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),a+=i[1];else
// autolink
if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=":"===i[1].charAt(6)?this.mangle(i[1].substring(7)):this.mangle(i[1]),r=this.mangle("mailto:")+n):(n=o(i[1]),r=n),a+=this.renderer.link(r,null,n);else
// url (gfm)
if(this.inLink||!(i=this.rules.url.exec(e))){
// tag
if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),a+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):o(i[0]):i[0];else
// link
if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,a+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else
// reflink, nolink
if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){a+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,a+=this.outputLink(i,t),this.inLink=!1}else
// strong
if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),a+=this.renderer.strong(this.output(i[2]||i[1]));else
// em
if(i=this.rules.em.exec(e))e=e.substring(i[0].length),a+=this.renderer.em(this.output(i[2]||i[1]));else
// code
if(i=this.rules.code.exec(e))e=e.substring(i[0].length),a+=this.renderer.codespan(o(i[2],!0));else
// br
if(i=this.rules.br.exec(e))e=e.substring(i[0].length),a+=this.renderer.br();else
// del (gfm)
if(i=this.rules.del.exec(e))e=e.substring(i[0].length),a+=this.renderer.del(this.output(i[1]));else
// text
if(i=this.rules.text.exec(e))e=e.substring(i[0].length),a+=this.renderer.text(o(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=o(i[1]),r=n,a+=this.renderer.link(r,null,n);return a},/**
 * Compile Link
 */
n.prototype.outputLink=function(e,t){var n=o(t.href),r=t.title?o(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,o(e[1]))},/**
 * Smartypants Transformations
 */
n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},/**
 * Mangle Links
 */
n.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,i=0;i<r;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+o(t,!0)+'">'+(n?e:o(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:o(e,!0))+"\n</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},
// span level renderer
r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(a(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return""}var i='<a href="'+e+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>"},r.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},/**
 * Static Parse Method
 */
i.parse=function(e,t,n){return new i(t,n).parse(e)},/**
 * Parse Loop
 */
i.prototype.parse=function(e){this.inline=new n(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},/**
 * Next Token
 */
i.prototype.next=function(){return this.token=this.tokens.pop()},/**
 * Preview Next Token
 */
i.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},/**
 * Parse Text Tokens
 */
i.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},/**
 * Parse Current Token
 */
i.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,i="",o="";for(
// header
n="",e=0;e<this.token.header.length;e++)({header:!0,align:this.token.align[e]}),n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});o+=this.renderer.tablerow(n)}return this.renderer.table(i,o);case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":for(var o="",a=this.token.ordered;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,a);case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var s=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(s);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},l.exec=l,/**
 * Options
 */
c.options=c.setOptions=function(e){return u(c.defaults,e),c},c.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new r,xhtml:!1},/**
 * Expose
 */
c.Parser=i,c.parser=i.parse,c.Renderer=r,c.Lexer=t,c.lexer=t.lex,c.InlineLexer=n,c.inlineLexer=n.output,c.parse=c,e.exports=c}).call(function(){return this||("undefined"!=typeof window?window:t)}())}).call(t,n("Gkk9"))},/***/
Z7si:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
!function(e){// CommonJS
e(n("U66f"),n("fIYl"),n("xnXw"))}(function(e){"use strict";var t=/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;e.defineMode("gfm",function(n,r){function i(e){return e.code=!1,null}var o=0,a={startState:function(){return{code:!1,codeBlock:!1,ateSpace:!1}},copyState:function(e){return{code:e.code,codeBlock:e.codeBlock,ateSpace:e.ateSpace}},token:function(e,n){
// Hack to prevent formatting override inside code blocks (block and inline)
if(n.combineTokens=null,n.codeBlock)return e.match(/^```+/)?(n.codeBlock=!1,null):(e.skipToEnd(),null);if(e.sol()&&(n.code=!1),e.sol()&&e.match(/^```+/))return e.skipToEnd(),n.codeBlock=!0,null;
// If this block is changed, it may need to be updated in Markdown mode
if("`"===e.peek()){e.next();var i=e.pos;e.eatWhile("`");var a=1+e.pos-i;// Must be exact
return n.code?a===o&&(n.code=!1):(o=a,n.code=!0),null}if(n.code)return e.next(),null;
// Check if space. If so, links can be formatted later on
if(e.eatSpace())return n.ateSpace=!0,null;if((e.sol()||n.ateSpace)&&(n.ateSpace=!1,!1!==r.gitHubSpice)){if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/))
// User/Project@SHA
// User@SHA
// SHA
return n.combineTokens=!0,"link";if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/))
// User/Project#Num
// User#Num
// #Num
return n.combineTokens=!0,"link"}
// URLs
// Taken from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
// And then (issue #1160) simplified to make it not crash the Chrome Regexp engine
// And then limited url schemes to the CommonMark list, so foo:bar isn't matched as a URL
return e.match(t)&&"]("!=e.string.slice(e.start-2,e.start)&&(0==e.start||/\W/.test(e.string.charAt(e.start-1)))?(n.combineTokens=!0,"link"):(e.next(),null)},blankLine:i},s={taskLists:!0,strikethrough:!0,emoji:!0};for(var l in r)s[l]=r[l];return s.name="markdown",e.overlayMode(e.getMode(n,s),a)},"markdown"),e.defineMIME("text/x-gfm","gfm")})},/***/
Zd6c:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
!function(e){// CommonJS
e(n("U66f"))}(function(e){"use strict";function t(e){var t=e.getWrapperElement();e.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:t.style.width,height:t.style.height},t.style.width="",t.style.height="auto",t.className+=" CodeMirror-fullscreen",document.documentElement.style.overflow="hidden",e.refresh()}function n(e){var t=e.getWrapperElement();t.className=t.className.replace(/\s*CodeMirror-fullscreen\b/,""),document.documentElement.style.overflow="";var n=e.state.fullScreenRestore;t.style.width=n.width,t.style.height=n.height,window.scrollTo(n.scrollLeft,n.scrollTop),e.refresh()}e.defineOption("fullScreen",!1,function(r,i,o){o==e.Init&&(o=!1),!o!=!i&&(i?t(r):n(r))})})},/***/
ZrRS:/***/
function(e,t,n){"use strict";/**
 * Fix shortcut. Mac use Command, others use Ctrl.
 */
function r(e){return e=H?e.replace("Ctrl","Cmd"):e.replace("Cmd","Ctrl")}/**
 * Create icon element for toolbar.
 */
function i(e,t,n){e=e||{};var r=document.createElement("a");return t=void 0==t||t,e.title&&t&&(r.title=a(e.title,e.action,n),H&&(r.title=r.title.replace("Ctrl","⌘"),r.title=r.title.replace("Alt","⌥"))),r.tabIndex=-1,r.className=e.className,r}function o(){var e=document.createElement("i");return e.className="separator",e.innerHTML="|",e}function a(e,t,n){var i,o=e;return t&&(i=V(t),n[i]&&(o+=" ("+r(n[i])+")")),o}/**
 * The state of CodeMirror at the given position.
 */
function s(e,t){t=t||e.getCursor("start");var n=e.getTokenAt(t);if(!n.type)return{};for(var r,i,o=n.type.split(" "),a={},s=0;s<o.length;s++)r=o[s],"strong"===r?a.bold=!0:"variable-2"===r?(i=e.getLine(t.line),/^\s*\d+\.\s/.test(i)?a["ordered-list"]=!0:a["unordered-list"]=!0):"atom"===r?a.quote=!0:"em"===r?a.italic=!0:"quote"===r?a.quote=!0:"strikethrough"===r?a.strikethrough=!0:"comment"===r?a.code=!0:"link"===r?a.link=!0:"tag"===r?a.image=!0:r.match(/^header(\-[1-6])?$/)&&(a[r.replace("header","heading")]=!0);return a}/**
 * Toggle full screen of the editor.
 */
function l(e){
// Set fullscreen
var t=e.codemirror;t.setOption("fullScreen",!t.getOption("fullScreen")),
// Prevent scrolling on body during fullscreen active
t.getOption("fullScreen")?(G=document.body.style.overflow,document.body.style.overflow="hidden"):document.body.style.overflow=G;
// Update toolbar class
var n=t.getWrapperElement();/fullscreen/.test(n.previousSibling.className)?n.previousSibling.className=n.previousSibling.className.replace(/\s*fullscreen\b/,""):n.previousSibling.className+=" fullscreen";
// Update toolbar button
var r=e.toolbarElements.fullscreen;/active/.test(r.className)?r.className=r.className.replace(/\s*active\s*/g,""):r.className+=" active",/editor-preview-active-side/.test(t.getWrapperElement().nextSibling.className)&&A(e)}/**
 * Action for toggling bold.
 */
function u(e){N(e,"bold",e.options.blockStyles.bold)}/**
 * Action for toggling italic.
 */
function c(e){N(e,"italic",e.options.blockStyles.italic)}/**
 * Action for toggling strikethrough.
 */
function f(e){N(e,"strikethrough","~~")}/**
 * Action for toggling code block.
 */
function d(e){function t(e){/* return true, if this is a ``` or ~~~ line */
if("object"!=typeof e)throw"fencing_line() takes a 'line' object (not a line number, or line text).  Got: "+typeof e+": "+e;return e.styles&&e.styles[2]&&-1!==e.styles[2].indexOf("formatting-code-block")}function n(e){
// base goes an extra level deep when mode backdrops are used, e.g. spellchecker on
return e.state.base.base||e.state.base}function r(e,r,i,o,a){/*
		 * Return "single", "indented", "fenced" or false
		 *
		 * cm and line_num are required.  Others are optional for efficiency
		 *   To check in the middle of a line, pass in firstTok yourself.
		 */
i=i||e.getLineHandle(r),o=o||e.getTokenAt({line:r,ch:1}),a=a||!!i.text&&e.getTokenAt({line:r,ch:i.text.length-1});var s=o.type?o.type.split(" "):[];return a&&n(a).indentedCode?"indented":-1!==s.indexOf("comment")&&(n(o).fencedChars||n(a).fencedChars||t(i)?"fenced":"single")}var i,o,a,s=e.options.blockStyles.code,l=e.codemirror,u=l.getCursor("start"),c=l.getCursor("end"),f=l.getTokenAt({line:u.line,ch:u.ch||1}),// avoid ch 0 which is a cursor pos but not token
d=l.getLineHandle(u.line),p=r(l,u.line,d,f);if("single"===p){
// similar to some SimpleMDE _toggleBlock logic
var h=d.text.slice(0,u.ch).replace("`",""),g=d.text.slice(u.ch).replace("`","");l.replaceRange(h+g,{line:u.line,ch:0},{line:u.line,ch:99999999999999}),u.ch--,u!==c&&c.ch--,l.setSelection(u,c),l.focus()}else if("fenced"===p)if(u.line!==c.line||u.ch!==c.ch){
// use selection
// find the fenced line so we know what type it is (tilde, backticks, number of them)
for(i=u.line;i>=0&&(d=l.getLineHandle(i),!t(d));i--);var m,v,y,b,w=l.getTokenAt({line:i,ch:1}),k=n(w).fencedChars;
// check for selection going up against fenced lines, in which case we don't want to add more fencing
t(l.getLineHandle(u.line))?(m="",v=u.line):t(l.getLineHandle(u.line-1))?(m="",v=u.line-1):(m=k+"\n",v=u.line),t(l.getLineHandle(c.line))?(y="",b=c.line,0===c.ch&&(b+=1)):0!==c.ch&&t(l.getLineHandle(c.line+1))?(y="",b=c.line+1):(y=k+"\n",b=c.line+1),0===c.ch&&(
// full last line selected, putting cursor at beginning of next
b-=1),l.operation(function(){
// end line first, so that line numbers don't change
l.replaceRange(y,{line:b,ch:0},{line:b+(y?0:1),ch:0}),l.replaceRange(m,{line:v,ch:0},{line:v+(m?0:1),ch:0})}),l.setSelection({line:v+(m?1:0),ch:0},{line:b+(m?1:-1),ch:0}),l.focus()}else{
// no selection, search for ends of this fenced block
var _=u.line;if(t(l.getLineHandle(u.line))&&(// gets a little tricky if cursor is right on a fenced line
"fenced"===r(l,u.line+1)?(i=u.line,_=u.line+1):(o=u.line,_=u.line-1)),void 0===i)for(i=_;i>=0&&(d=l.getLineHandle(i),!t(d));i--);if(void 0===o)for(a=l.lineCount(),o=_;o<a&&(d=l.getLineHandle(o),!t(d));o++);l.operation(function(){l.replaceRange("",{line:i,ch:0},{line:i+1,ch:0}),l.replaceRange("",{line:o-1,ch:0},{line:o,ch:0})}),l.focus()}else if("indented"===p){if(u.line!==c.line||u.ch!==c.ch)
// use selection
i=u.line,o=c.line,0===c.ch&&o--;else{
// no selection, search for ends of this indented block
for(i=u.line;i>=0;i--)if(d=l.getLineHandle(i),!d.text.match(/^\s*$/)&&"indented"!==r(l,i,d)){i+=1;break}for(a=l.lineCount(),o=u.line;o<a;o++)if(d=l.getLineHandle(o),!d.text.match(/^\s*$/)&&"indented"!==r(l,o,d)){o-=1;break}}
// if we are going to un-indent based on a selected set of lines, and the next line is indented too, we need to
// insert a blank line so that the next line(s) continue to be indented code
var S=l.getLineHandle(o+1),x=S&&l.getTokenAt({line:o+1,ch:S.text.length-1}),T=x&&n(x).indentedCode;T&&l.replaceRange("\n",{line:o+1,ch:0});for(var C=i;C<=o;C++)l.indentLine(C,"subtract");l.focus()}else{
// insert code formatting
var E=u.line===c.line&&u.ch===c.ch&&0===u.ch,A=u.line!==c.line;E||A?function(e,t,n,r){var i=t.line+1,o=n.line+1,a=t.line!==n.line,s=r+"\n",l="\n"+r;a&&o++,
// handle last char including \n or not
a&&0===n.ch&&(l=r+"\n",o--),O(e,!1,[s,l]),e.setSelection({line:i,ch:0},{line:o,ch:0})}(l,u,c,s):O(l,!1,["`","`"])}}/**
 * Action for toggling blockquote.
 */
function p(e){M(e.codemirror,"quote")}/**
 * Action for toggling heading size: normal -> h1 -> h2 -> h3 -> h4 -> h5 -> h6 -> normal
 */
function h(e){R(e.codemirror,"smaller")}/**
 * Action for toggling heading size: normal -> h6 -> h5 -> h4 -> h3 -> h2 -> h1 -> normal
 */
function g(e){R(e.codemirror,"bigger")}/**
 * Action for toggling heading size 1
 */
function m(e){R(e.codemirror,void 0,1)}/**
 * Action for toggling heading size 2
 */
function v(e){R(e.codemirror,void 0,2)}/**
 * Action for toggling heading size 3
 */
function y(e){R(e.codemirror,void 0,3)}/**
 * Action for toggling ul.
 */
function b(e){M(e.codemirror,"unordered-list")}/**
 * Action for toggling ol.
 */
function w(e){M(e.codemirror,"ordered-list")}/**
 * Action for clean block (remove headline, list, blockquote code, markers)
 */
function k(e){L(e.codemirror)}/**
 * Action for drawing a link.
 */
function _(e){var t=e.codemirror,n=s(t),r=e.options,i="http://";if(r.promptURLs&&!(i=prompt(r.promptTexts.link)))return!1;O(t,n.link,r.insertTexts.link,i)}/**
 * Action for drawing an img.
 */
function S(e){var t=e.codemirror,n=s(t),r=e.options,i="http://";if(r.promptURLs&&!(i=prompt(r.promptTexts.image)))return!1;O(t,n.image,r.insertTexts.image,i)}/**
 * Action for drawing a table.
 */
function x(e){var t=e.codemirror,n=s(t),r=e.options;O(t,n.table,r.insertTexts.table)}/**
 * Action for drawing a horizontal rule.
 */
function T(e){var t=e.codemirror,n=s(t),r=e.options;O(t,n.image,r.insertTexts.horizontalRule)}/**
 * Undo action.
 */
function C(e){var t=e.codemirror;t.undo(),t.focus()}/**
 * Redo action.
 */
function E(e){var t=e.codemirror;t.redo(),t.focus()}/**
 * Toggle side by side preview
 */
function A(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.nextSibling,i=e.toolbarElements["side-by-side"],o=!1;/editor-preview-active-side/.test(r.className)?(r.className=r.className.replace(/\s*editor-preview-active-side\s*/g,""),i.className=i.className.replace(/\s*active\s*/g,""),n.className=n.className.replace(/\s*CodeMirror-sided\s*/g," ")):(
// When the preview button is clicked for the first time,
// give some time for the transition from editor.css to fire and the view to slide from right to left,
// instead of just appearing.
setTimeout(function(){t.getOption("fullScreen")||l(e),r.className+=" editor-preview-active-side"},1),i.className+=" active",n.className+=" CodeMirror-sided",o=!0);
// Hide normal preview if active
var a=n.lastChild;if(/editor-preview-active/.test(a.className)){a.className=a.className.replace(/\s*editor-preview-active\s*/g,"");var s=e.toolbarElements.preview,u=n.previousSibling;s.className=s.className.replace(/\s*active\s*/g,""),u.className=u.className.replace(/\s*disabled-for-preview*/g,"")}var c=function(){r.innerHTML=e.options.previewRender(e.value(),r)};t.sideBySideRenderingFunction||(t.sideBySideRenderingFunction=c),o?(r.innerHTML=e.options.previewRender(e.value(),r),t.on("update",t.sideBySideRenderingFunction)):t.off("update",t.sideBySideRenderingFunction),
// Refresh to fix selection being off (#309)
t.refresh()}/**
 * Preview action.
 */
function P(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.previousSibling,i=!!e.options.toolbar&&e.toolbarElements.preview,o=n.lastChild;o&&/editor-preview/.test(o.className)||(o=document.createElement("div"),o.className="editor-preview",n.appendChild(o)),/editor-preview-active/.test(o.className)?(o.className=o.className.replace(/\s*editor-preview-active\s*/g,""),i&&(i.className=i.className.replace(/\s*active\s*/g,""),r.className=r.className.replace(/\s*disabled-for-preview*/g,""))):(
// When the preview button is clicked for the first time,
// give some time for the transition from editor.css to fire and the view to slide from right to left,
// instead of just appearing.
setTimeout(function(){o.className+=" editor-preview-active"},1),i&&(i.className+=" active",r.className+=" disabled-for-preview")),o.innerHTML=e.options.previewRender(e.value(),o),/editor-preview-active-side/.test(t.getWrapperElement().nextSibling.className)&&A(e)}function O(e,t,n,r){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){var i,o=n[0],a=n[1],s=e.getCursor("start"),l=e.getCursor("end");r&&(a=a.replace("#url#",r)),t?(i=e.getLine(s.line),o=i.slice(0,s.ch),a=i.slice(s.ch),e.replaceRange(o+a,{line:s.line,ch:0})):(i=e.getSelection(),e.replaceSelection(o+i+a),s.ch+=o.length,s!==l&&(l.ch+=o.length)),e.setSelection(s,l),e.focus()}}function R(e,t,n){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var r=e.getCursor("start"),i=e.getCursor("end"),o=r.line;o<=i.line;o++)!function(r){var i=e.getLine(r),o=i.search(/[^#]/);i=void 0!==t?o<=0?"bigger"==t?"###### "+i:"# "+i:6==o&&"smaller"==t?i.substr(7):1==o&&"bigger"==t?i.substr(2):"bigger"==t?i.substr(1):"#"+i:1==n?o<=0?"# "+i:o==n?i.substr(o+1):"# "+i.substr(o+1):2==n?o<=0?"## "+i:o==n?i.substr(o+1):"## "+i.substr(o+1):o<=0?"### "+i:o==n?i.substr(o+1):"### "+i.substr(o+1),e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(o);e.focus()}}function M(e,t){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var n=s(e),r=e.getCursor("start"),i=e.getCursor("end"),o={quote:/^(\s*)\>\s+/,"unordered-list":/^(\s*)(\*|\-|\+)\s+/,"ordered-list":/^(\s*)\d+\.\s+/},a={quote:"> ","unordered-list":"* ","ordered-list":"1. "},l=r.line;l<=i.line;l++)!function(r){var i=e.getLine(r);i=n[t]?i.replace(o[t],"$1"):a[t]+i,e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(l);e.focus()}}function N(e,t,n,r){if(!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)){r=void 0===r?n:r;var i,o=e.codemirror,a=s(o),l=n,u=r,c=o.getCursor("start"),f=o.getCursor("end");a[t]?(i=o.getLine(c.line),l=i.slice(0,c.ch),u=i.slice(c.ch),"bold"==t?(l=l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/,""),u=u.replace(/(\*\*|__)/,"")):"italic"==t?(l=l.replace(/(\*|_)(?![\s\S]*(\*|_))/,""),u=u.replace(/(\*|_)/,"")):"strikethrough"==t&&(l=l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/,""),u=u.replace(/(\*\*|~~)/,"")),o.replaceRange(l+u,{line:c.line,ch:0},{line:c.line,ch:99999999999999}),"bold"==t||"strikethrough"==t?(c.ch-=2,c!==f&&(f.ch-=2)):"italic"==t&&(c.ch-=1,c!==f&&(f.ch-=1))):(i=o.getSelection(),"bold"==t?(i=i.split("**").join(""),i=i.split("__").join("")):"italic"==t?(i=i.split("*").join(""),i=i.split("_").join("")):"strikethrough"==t&&(i=i.split("~~").join("")),o.replaceSelection(l+i+u),c.ch+=n.length,f.ch=c.ch+i.length),o.setSelection(c,f),o.focus()}}function L(e){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className))for(var t,n=e.getCursor("start"),r=e.getCursor("end"),i=n.line;i<=r.line;i++)t=e.getLine(i),t=t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/,""),e.replaceRange(t,{line:i,ch:0},{line:i,ch:99999999999999})}
// Merge the properties of one object into another.
function I(e,t){for(var n in t)t.hasOwnProperty(n)&&(t[n]instanceof Array?e[n]=t[n].concat(e[n]instanceof Array?e[n]:[]):null!==t[n]&&"object"==typeof t[n]&&t[n].constructor===Object?e[n]=I(e[n]||{},t[n]):e[n]=t[n]);return e}
// Merge an arbitrary number of objects into one.
function U(e){for(var t=1;t<arguments.length;t++)e=I(e,arguments[t]);return e}/* The right word count in respect for CJK. */
function j(e){var t=/[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,n=e.match(t),r=0;if(null===n)return r;for(var i=0;i<n.length;i++)n[i].charCodeAt(0)>=19968?r+=n[i].length:r+=1;return r}/**
 * Interface of SimpleMDE.
 */
function B(e){
// Handle options parameter
e=e||{},
// Used later to refer to it"s parent
e.parent=this;
// Check if Font Awesome needs to be auto downloaded
var t=!0;if(!1===e.autoDownloadFontAwesome&&(t=!1),!0!==e.autoDownloadFontAwesome)for(var n=document.styleSheets,r=0;r<n.length;r++)n[r].href&&n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/")>-1&&(t=!1);if(t){var i=document.createElement("link");i.rel="stylesheet",i.href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(i)}
// Find the textarea to use
if(e.element)this.element=e.element;else if(null===e.element)
// This means that the element option was specified, but no element was found
return void console.log("SimpleMDE: Error. No element was found.");
// Handle toolbar
if(void 0===e.toolbar){
// Initialize
e.toolbar=[];
// Loop over the built in buttons, to get the preferred order
for(var o in X)X.hasOwnProperty(o)&&(-1!=o.indexOf("separator-")&&e.toolbar.push("|"),(!0===X[o].default||e.showIcons&&e.showIcons.constructor===Array&&-1!=e.showIcons.indexOf(o))&&e.toolbar.push(o))}
// Handle status bar
e.hasOwnProperty("status")||(e.status=["autosave","lines","words","cursor"]),
// Add default preview rendering function
e.previewRender||(e.previewRender=function(e){
// Note: "this" refers to the options object
return this.parent.markdown(e)}),
// Set default options for parsing config
e.parsingConfig=U({highlightFormatting:!0},e.parsingConfig||{}),
// Merging the insertTexts, with the given options
e.insertTexts=U({},Z,e.insertTexts||{}),
// Merging the promptTexts, with the given options
e.promptTexts=J,
// Merging the blockStyles, with the given options
e.blockStyles=U({},K,e.blockStyles||{}),
// Merging the shortcuts, with the given options
e.shortcuts=U({},W,e.shortcuts||{}),
// Change unique_id to uniqueId for backwards compatibility
void 0!=e.autosave&&void 0!=e.autosave.unique_id&&""!=e.autosave.unique_id&&(e.autosave.uniqueId=e.autosave.unique_id),
// Update this options
this.options=e,
// Auto render
this.render(),
// The codemirror component is only available after rendering
// so, the setter for the initialValue can only run after
// the element has been rendered
!e.initialValue||this.options.autosave&&!0===this.options.autosave.foundSavedValue||this.value(e.initialValue)}
// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem throw QuotaExceededError. We're going to detect this and set a variable accordingly.
function q(){if("object"!=typeof localStorage)return!1;try{localStorage.setItem("smde_localStorage",1),localStorage.removeItem("smde_localStorage")}catch(e){return!1}return!0}/*global require,module*/
var F=n("U66f");n("dVg5"),n("WFpN"),n("Zd6c"),n("fIYl"),n("xnXw"),n("DZG7"),n("kEX9"),n("Z7si"),n("Qdxy");var D=n("Tj9T"),z=n("WSqq"),H=/Mac/.test(navigator.platform),Y={toggleBold:u,toggleItalic:c,drawLink:_,toggleHeadingSmaller:h,toggleHeadingBigger:g,drawImage:S,toggleBlockquote:p,toggleOrderedList:w,toggleUnorderedList:b,toggleCodeBlock:d,togglePreview:P,toggleStrikethrough:f,toggleHeading1:m,toggleHeading2:v,toggleHeading3:y,cleanBlock:k,drawTable:x,drawHorizontalRule:T,undo:C,redo:E,toggleSideBySide:A,toggleFullScreen:l},W={toggleBold:"Cmd-B",toggleItalic:"Cmd-I",drawLink:"Cmd-K",toggleHeadingSmaller:"Cmd-H",toggleHeadingBigger:"Shift-Cmd-H",cleanBlock:"Cmd-E",drawImage:"Cmd-Alt-I",toggleBlockquote:"Cmd-'",toggleOrderedList:"Cmd-Alt-L",toggleUnorderedList:"Cmd-L",toggleCodeBlock:"Cmd-Alt-C",togglePreview:"Cmd-P",toggleSideBySide:"F9",toggleFullScreen:"F11"},V=function(e){for(var t in Y)if(Y[t]===e)return t;return null},$=function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e},G="",X={bold:{name:"bold",action:u,className:"fa fa-bold",title:"Bold",default:!0},italic:{name:"italic",action:c,className:"fa fa-italic",title:"Italic",default:!0},strikethrough:{name:"strikethrough",action:f,className:"fa fa-strikethrough",title:"Strikethrough"},heading:{name:"heading",action:h,className:"fa fa-header",title:"Heading",default:!0},"heading-smaller":{name:"heading-smaller",action:h,className:"fa fa-header fa-header-x fa-header-smaller",title:"Smaller Heading"},"heading-bigger":{name:"heading-bigger",action:g,className:"fa fa-header fa-header-x fa-header-bigger",title:"Bigger Heading"},"heading-1":{name:"heading-1",action:m,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},"heading-2":{name:"heading-2",action:v,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},"heading-3":{name:"heading-3",action:y,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},"separator-1":{name:"separator-1"},code:{name:"code",action:d,className:"fa fa-code",title:"Code"},quote:{name:"quote",action:p,className:"fa fa-quote-left",title:"Quote",default:!0},"unordered-list":{name:"unordered-list",action:b,className:"fa fa-list-ul",title:"Generic List",default:!0},"ordered-list":{name:"ordered-list",action:w,className:"fa fa-list-ol",title:"Numbered List",default:!0},"clean-block":{name:"clean-block",action:k,className:"fa fa-eraser fa-clean-block",title:"Clean block"},"separator-2":{name:"separator-2"},link:{name:"link",action:_,className:"fa fa-link",title:"Create Link",default:!0},image:{name:"image",action:S,className:"fa fa-picture-o",title:"Insert Image",default:!0},table:{name:"table",action:x,className:"fa fa-table",title:"Insert Table"},"horizontal-rule":{name:"horizontal-rule",action:T,className:"fa fa-minus",title:"Insert Horizontal Line"},"separator-3":{name:"separator-3"},preview:{name:"preview",action:P,className:"fa fa-eye no-disable",title:"Toggle Preview",default:!0},"side-by-side":{name:"side-by-side",action:A,className:"fa fa-columns no-disable no-mobile",title:"Toggle Side by Side",default:!0},fullscreen:{name:"fullscreen",action:l,className:"fa fa-arrows-alt no-disable no-mobile",title:"Toggle Fullscreen",default:!0},"separator-4":{name:"separator-4"},guide:{name:"guide",action:"https://simplemde.com/markdown-guide",className:"fa fa-question-circle",title:"Markdown Guide",default:!0},"separator-5":{name:"separator-5"},undo:{name:"undo",action:C,className:"fa fa-undo no-disable",title:"Undo"},redo:{name:"redo",action:E,className:"fa fa-repeat no-disable",title:"Redo"}},Z={link:["[","](#url#)"],image:["![](","#url#)"],table:["","\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],horizontalRule:["","\n\n-----\n\n"]},J={link:"URL for the link:",image:"URL of the image:"},K={bold:"**",code:"```",italic:"*"};/**
 * Default markdown render.
 */
B.prototype.markdown=function(e){if(z){
// Initialize
var t={};
// Return
// Update options
// Set options
return this.options&&this.options.renderingConfig&&!1===this.options.renderingConfig.singleLineBreaks?t.breaks=!1:t.breaks=!0,this.options&&this.options.renderingConfig&&!0===this.options.renderingConfig.codeSyntaxHighlighting&&window.hljs&&(t.highlight=function(e){return window.hljs.highlightAuto(e).value}),z.setOptions(t),z(e)}},/**
 * Render editor to the given element.
 */
B.prototype.render=function(e){if(e||(e=this.element||document.getElementsByTagName("textarea")[0]),!this._rendered||this._rendered!==e){this.element=e;var t=this.options,n=this,i={};for(var o in t.shortcuts)
// null stands for "do not bind this command"
null!==t.shortcuts[o]&&null!==Y[o]&&function(e){i[r(t.shortcuts[e])]=function(){Y[e](n)}}(o);i.Enter="newlineAndIndentContinueMarkdownList",i.Tab="tabAndIndentMarkdownList",i["Shift-Tab"]="shiftTabAndUnindentMarkdownList",i.Esc=function(e){e.getOption("fullScreen")&&l(n)},document.addEventListener("keydown",function(e){e=e||window.event,27==e.keyCode&&n.codemirror.getOption("fullScreen")&&l(n)},!1);var a,s;if(!1!==t.spellChecker?(a="spell-checker",s=t.parsingConfig,s.name="gfm",s.gitHubSpice=!1,D({codeMirrorInstance:F})):(a=t.parsingConfig,a.name="gfm",a.gitHubSpice=!1),this.codemirror=F.fromTextArea(e,{mode:a,backdrop:s,theme:"paper",tabSize:void 0!=t.tabSize?t.tabSize:2,indentUnit:void 0!=t.tabSize?t.tabSize:2,indentWithTabs:!1!==t.indentWithTabs,lineNumbers:!1,autofocus:!0===t.autofocus,extraKeys:i,lineWrapping:!1!==t.lineWrapping,allowDropFileTypes:["text/plain"],placeholder:t.placeholder||e.getAttribute("placeholder")||"",styleSelectedText:void 0==t.styleSelectedText||t.styleSelectedText}),!0===t.forceSync){var u=this.codemirror;u.on("change",function(){u.save()})}this.gui={},!1!==t.toolbar&&(this.gui.toolbar=this.createToolbar()),!1!==t.status&&(this.gui.statusbar=this.createStatusbar()),void 0!=t.autosave&&!0===t.autosave.enabled&&this.autosave(),this.gui.sideBySide=this.createSideBySide(),this._rendered=this.element;
// Fixes CodeMirror bug (#344)
var c=this.codemirror;setTimeout(function(){c.refresh()}.bind(c),0)}},B.prototype.autosave=function(){if(q()){var e=this;if(void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");null!=e.element.form&&void 0!=e.element.form&&e.element.form.addEventListener("submit",function(){localStorage.removeItem("smde_"+e.options.autosave.uniqueId)}),!0!==this.options.autosave.loaded&&("string"==typeof localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&""!=localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&(this.codemirror.setValue(localStorage.getItem("smde_"+this.options.autosave.uniqueId)),this.options.autosave.foundSavedValue=!0),this.options.autosave.loaded=!0),localStorage.setItem("smde_"+this.options.autosave.uniqueId,e.value());var t=document.getElementById("autosaved");if(null!=t&&void 0!=t&&""!=t){var n=new Date,r=n.getHours(),i=n.getMinutes(),o="am",a=r;a>=12&&(a=r-12,o="pm"),0==a&&(a=12),i=i<10?"0"+i:i,t.innerHTML="Autosaved: "+a+":"+i+" "+o}this.autosaveTimeoutId=setTimeout(function(){e.autosave()},this.options.autosave.delay||1e4)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},B.prototype.clearAutosavedValue=function(){if(q()){if(void 0==this.options.autosave||void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");localStorage.removeItem("smde_"+this.options.autosave.uniqueId)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},B.prototype.createSideBySide=function(){var e=this.codemirror,t=e.getWrapperElement(),n=t.nextSibling;n&&/editor-preview-side/.test(n.className)||(n=document.createElement("div"),n.className="editor-preview-side",t.parentNode.insertBefore(n,t.nextSibling));
// Syncs scroll  editor -> preview
var r=!1,i=!1;
// Syncs scroll  preview -> editor
return e.on("scroll",function(e){if(r)return void(r=!1);i=!0;var t=e.getScrollInfo().height-e.getScrollInfo().clientHeight,o=parseFloat(e.getScrollInfo().top)/t,a=(n.scrollHeight-n.clientHeight)*o;n.scrollTop=a}),n.onscroll=function(){if(i)return void(i=!1);r=!0;var t=n.scrollHeight-n.clientHeight,o=parseFloat(n.scrollTop)/t,a=(e.getScrollInfo().height-e.getScrollInfo().clientHeight)*o;e.scrollTo(0,a)},n},B.prototype.createToolbar=function(e){if((e=e||this.options.toolbar)&&0!==e.length){var t;for(t=0;t<e.length;t++)void 0!=X[e[t]]&&(e[t]=X[e[t]]);var n=document.createElement("div");n.className="editor-toolbar";var r=this,a={};for(r.toolbar=e,t=0;t<e.length;t++)if(("guide"!=e[t].name||!1!==r.options.toolbarGuideIcon)&&!(r.options.hideIcons&&-1!=r.options.hideIcons.indexOf(e[t].name)||("fullscreen"==e[t].name||"side-by-side"==e[t].name)&&$()))
// Fullscreen does not work well on mobile devices (even tablets)
// In the future, hopefully this can be resolved
{
// Don't include trailing separators
if("|"===e[t]){for(var l=!1,u=t+1;u<e.length;u++)"|"===e[u]||r.options.hideIcons&&-1!=r.options.hideIcons.indexOf(e[u].name)||(l=!0);if(!l)continue}
// Create the icon and append to the toolbar
!function(e){var t;t="|"===e?o():i(e,r.options.toolbarTips,r.options.shortcuts),
// bind events, special for info
e.action&&("function"==typeof e.action?t.onclick=function(t){t.preventDefault(),e.action(r)}:"string"==typeof e.action&&(t.href=e.action,t.target="_blank")),a[e.name||e]=t,n.appendChild(t)}(e[t])}r.toolbarElements=a;var c=this.codemirror;c.on("cursorActivity",function(){var e=s(c);for(var t in a)!function(t){var n=a[t];e[t]?n.className+=" active":"fullscreen"!=t&&"side-by-side"!=t&&(n.className=n.className.replace(/\s*active\s*/g,""))}(t)});var f=c.getWrapperElement();return f.parentNode.insertBefore(n,f),n}},B.prototype.createStatusbar=function(e){
// Initialize
e=e||this.options.status;var t=this.options,n=this.codemirror;
// Make sure the status variable is valid
if(e&&0!==e.length){
// Set up the built-in items
var r,i,o,a=[];for(r=0;r<e.length;r++)
// Handle if custom or not
if(
// Reset some values
i=void 0,o=void 0,"object"==typeof e[r])a.push({className:e[r].className,defaultValue:e[r].defaultValue,onUpdate:e[r].onUpdate});else{var s=e[r];"words"===s?(o=function(e){e.innerHTML=j(n.getValue())},i=function(e){e.innerHTML=j(n.getValue())}):"lines"===s?(o=function(e){e.innerHTML=n.lineCount()},i=function(e){e.innerHTML=n.lineCount()}):"cursor"===s?(o=function(e){e.innerHTML="0:0"},i=function(e){var t=n.getCursor();e.innerHTML=t.line+":"+t.ch}):"autosave"===s&&(o=function(e){void 0!=t.autosave&&!0===t.autosave.enabled&&e.setAttribute("id","autosaved")}),a.push({className:s,defaultValue:o,onUpdate:i})}
// Create element for the status bar
var l=document.createElement("div");
// Create a new span for each item
for(l.className="editor-statusbar",r=0;r<a.length;r++){
// Store in temporary variable
var u=a[r],c=document.createElement("span");c.className=u.className,
// Ensure the defaultValue is a function
"function"==typeof u.defaultValue&&u.defaultValue(c),
// Ensure the onUpdate is a function
"function"==typeof u.onUpdate&&
// Create a closure around the span of the current action, then execute the onUpdate handler
this.codemirror.on("update",function(e,t){return function(){t.onUpdate(e)}}(c,u)),
// Append the item to the status bar
l.appendChild(c)}
// Insert the status bar into the DOM
var f=this.codemirror.getWrapperElement();return f.parentNode.insertBefore(l,f.nextSibling),l}},/**
 * Get or set the text content.
 */
B.prototype.value=function(e){return void 0===e?this.codemirror.getValue():(this.codemirror.getDoc().setValue(e),this)},/**
 * Bind static methods for exports.
 */
B.toggleBold=u,B.toggleItalic=c,B.toggleStrikethrough=f,B.toggleBlockquote=p,B.toggleHeadingSmaller=h,B.toggleHeadingBigger=g,B.toggleHeading1=m,B.toggleHeading2=v,B.toggleHeading3=y,B.toggleCodeBlock=d,B.toggleUnorderedList=b,B.toggleOrderedList=w,B.cleanBlock=k,B.drawLink=_,B.drawImage=S,B.drawTable=x,B.drawHorizontalRule=T,B.undo=C,B.redo=E,B.togglePreview=P,B.toggleSideBySide=A,B.toggleFullScreen=l,/**
 * Bind instance methods for exports.
 */
B.prototype.toggleBold=function(){u(this)},B.prototype.toggleItalic=function(){c(this)},B.prototype.toggleStrikethrough=function(){f(this)},B.prototype.toggleBlockquote=function(){p(this)},B.prototype.toggleHeadingSmaller=function(){h(this)},B.prototype.toggleHeadingBigger=function(){g(this)},B.prototype.toggleHeading1=function(){m(this)},B.prototype.toggleHeading2=function(){v(this)},B.prototype.toggleHeading3=function(){y(this)},B.prototype.toggleCodeBlock=function(){d(this)},B.prototype.toggleUnorderedList=function(){b(this)},B.prototype.toggleOrderedList=function(){w(this)},B.prototype.cleanBlock=function(){k(this)},B.prototype.drawLink=function(){_(this)},B.prototype.drawImage=function(){S(this)},B.prototype.drawTable=function(){x(this)},B.prototype.drawHorizontalRule=function(){T(this)},B.prototype.undo=function(){C(this)},B.prototype.redo=function(){E(this)},B.prototype.togglePreview=function(){P(this)},B.prototype.toggleSideBySide=function(){A(this)},B.prototype.toggleFullScreen=function(){l(this)},B.prototype.isPreviewActive=function(){return/editor-preview-active/.test(this.codemirror.getWrapperElement().lastChild.className)},B.prototype.isSideBySideActive=function(){return/editor-preview-active-side/.test(this.codemirror.getWrapperElement().nextSibling.className)},B.prototype.isFullscreenActive=function(){return this.codemirror.getOption("fullScreen")},B.prototype.getState=function(){return s(this.codemirror)},B.prototype.toTextArea=function(){var e=this.codemirror,t=e.getWrapperElement();t.parentNode&&(this.gui.toolbar&&t.parentNode.removeChild(this.gui.toolbar),this.gui.statusbar&&t.parentNode.removeChild(this.gui.statusbar),this.gui.sideBySide&&t.parentNode.removeChild(this.gui.sideBySide)),e.toTextArea(),this.autosaveTimeoutId&&(clearTimeout(this.autosaveTimeoutId),this.autosaveTimeoutId=void 0,this.clearAutosavedValue())},e.exports=B},/***/
b77J:/***/
function(e,t,n){/* WEBPACK VAR INJECTION */
(function(e){/*jslint newcap: true */
/*global inlineAttachment: false, jQuery: false */
/**
 * jQuery plugin for inline attach
 *
 * @param {document} document
 * @param {window} window
 * @param {jQuery} $
 */
!function(e,t,n){"use strict";inlineAttachment.editors.jquery={};/**
   * Creates a new editor using jQuery
   */
var r=function(e){var t=n(e);return{getValue:function(){return t.val()},insertValue:function(e){inlineAttachment.util.insertTextAtCursor(t[0],e)},setValue:function(e){t.val(e)}}};n.fn.inlineattachment=function(e){return n(this).each(function(){var t=n(this),i=new r(t),o=new inlineAttachment(e,i);t.bind({paste:function(e){o.onPaste(e.originalEvent)},drop:function(e){e.stopPropagation(),e.preventDefault(),o.onDrop(e.originalEvent)},"dragenter dragover":function(e){e.stopPropagation(),e.preventDefault()}})}),this},inlineAttachment.editors.jquery.Editor=r}(document,window,e)}).call(t,n("9ZC0"))},/***/
dVg5:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
!function(e){// CommonJS
e(n("U66f"))}(function(e){"use strict";
// Auto-updating Markdown list numbers when a new item is added to the
// middle of a list
function t(e,t){var r=t.line,i=0,o=0,a=n.exec(e.getLine(r)),s=a[1];do{i+=1;var l=r+i,u=e.getLine(l),c=n.exec(u);if(c){var f=c[1],d=parseInt(a[3],10)+i-o,p=parseInt(c[3],10),h=p;if(s===f)d===p&&(h=p+1),d>p&&(h=d+1),e.replaceRange(u.replace(n,f+h+c[4]+c[5]),{line:l,ch:0},{line:l,ch:u.length});else{if(s.length>f.length)return;
// This doesn't run if the next line immediatley indents, as it is
// not clear of the users intention (new indented item or same level)
if(s.length<f.length&&1===i)return;o+=1}}}while(c)}var n=/^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,r=/^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,i=/[*+-]\s/;e.commands.newlineAndIndentContinueMarkdownList=function(o){if(o.getOption("disableInput"))return e.Pass;for(var a=o.listSelections(),s=[],l=0;l<a.length;l++){var u=a[l].head,c=o.getStateAfter(u.line),f=!1!==c.list,d=0!==c.quote,p=o.getLine(u.line),h=n.exec(p),g=/^\s*$/.test(p.slice(0,u.ch));if(!a[l].empty()||!f&&!d||!h||g)return void o.execCommand("newlineAndIndent");if(r.test(p))/>\s*$/.test(p)||o.replaceRange("",{line:u.line,ch:0},{line:u.line,ch:u.ch+1}),s[l]="\n";else{var m=h[1],v=h[5],y=!(i.test(h[2])||h[2].indexOf(">")>=0),b=y?parseInt(h[3],10)+1+h[4]:h[2].replace("x"," ");s[l]="\n"+m+b+v,y&&t(o,u)}}o.replaceSelections(s)}})},/***/
iSXR:/***/
function(e,t,n){!function(t,r){e.exports=r(n("9ZC0"))}(0,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=48)}([function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(49),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(15),i=n(35),o=n(20),a=Object.defineProperty;t.f=n(5)?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){e.exports=!n(17)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,n){e.exports={default:n(55),__esModule:!0}},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(40),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,i.default)(t))&&"function"!=typeof t?e:t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(83),o=r(i),a=n(87),s=r(a),l=n(40),u=r(l);t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,u.default)(t)));e.prototype=(0,s.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(o.default?(0,o.default)(e,t):e.__proto__=t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=r(i),a=n(1),s=r(a),l=n(37),u=r(l),c=n(90),f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(c),d=function(){function e(t){(0,o.default)(this,e),this.options=u.default.extend({width:575,height:400,iconClass:"social-share-icon social-share-icon-"+this.getName()},t),this.element=this._createDomNode()}return(0,s.default)(e,[{key:"getName",value:function(){return"provider"}},{key:"getElement",value:function(){return this.element}},{key:"_createDomNode",value:function(){var e='<a href="javascript:void(0)" class="'+this.options.iconClass+'"></a>',t=(0,u.default)(e);return this._bindEvents(t),t}},{key:"_createUrl",value:function(){var e=this;return this._getUrlTemplate().replace(/\{(\w+)\}/g,function(t){var n=t.slice(1,-1);return void 0!==e.options[n]?e.options[n]:""})}},{key:"_getUrlTemplate",value:function(){return""}},{key:"_bindEvents",value:function(e){var t=this;e.on("click",function(){f.openWin(t._createUrl(),t.options.width,t.options.height).focus()})}}]),e}();t.default=d},function(e,t,n){var r=n(2),i=n(3),o=n(34),a=n(12),s=function(e,t,n){var l,u,c,f=e&s.F,d=e&s.G,p=e&s.S,h=e&s.P,g=e&s.B,m=e&s.W,v=d?i:i[t]||(i[t]={}),y=v.prototype,b=d?r:p?r[t]:(r[t]||{}).prototype;d&&(n=t);for(l in n)(u=!f&&b&&void 0!==b[l])&&l in v||(c=u?b[l]:n[l],v[l]=d&&"function"!=typeof b[l]?n[l]:g&&u?o(c,r):m&&b[l]==c?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(c):h&&"function"==typeof c?o(Function.call,c):c,h&&((v.virtual||(v.virtual={}))[l]=c,e&s.R&&y&&!y[l]&&a(y,l,c)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},function(e,t,n){var r=n(4),i=n(18);e.exports=n(5)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(64),i=n(21);e.exports=function(e){return r(i(e))}},function(e,t,n){var r=n(23)("wks"),i=n(19),o=n(2).Symbol,a="function"==typeof o;(e.exports=function(e){return r[e]||(r[e]=a&&o[e]||(a?o:i)("Symbol."+e))}).store=r},function(e,t,n){var r=n(16);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){var r=n(16);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(23)("keys"),i=n(19);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t,n){var r=n(2),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t){e.exports=!0},function(e,t){e.exports={}},function(e,t,n){var r=n(15),i=n(63),o=n(29),a=n(22)("IE_PROTO"),s=function(){},l=function(){var e,t=n(36)("iframe"),r=o.length;for(t.style.display="none",n(68).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;r--;)delete l.prototype[o[r]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(s.prototype=r(e),n=new s,s.prototype=null,n[a]=e):n=l(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(43),i=n(29);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var r=n(4).f,i=n(7),o=n(14)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},function(e,t,n){t.f=n(14)},function(e,t,n){var r=n(2),i=n(3),o=n(25),a=n(31),s=n(4).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:a.f(e)})}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,n){var r=n(52);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){e.exports=!n(5)&&!n(17)(function(){return 7!=Object.defineProperty(n(36)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(16),i=n(2).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},function(t,n){t.exports=e},function(e,t,n){var r=n(21);e.exports=function(e){return Object(r(e))}},function(e,t,n){var r=n(7),i=n(38),o=n(22)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(58),o=r(i),a=n(73),s=r(a),l="function"==typeof s.default&&"symbol"==typeof o.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};t.default="function"==typeof s.default&&"symbol"===l(o.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":void 0===e?"undefined":l(e)}},function(e,t,n){"use strict";var r=n(25),i=n(11),o=n(42),a=n(12),s=n(7),l=n(26),u=n(62),c=n(30),f=n(39),d=n(14)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};e.exports=function(e,t,n,g,m,v,y){u(n,t,g);var b,w,k,_=function(e){if(!p&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},S=t+" Iterator",x="values"==m,T=!1,C=e.prototype,E=C[d]||C["@@iterator"]||m&&C[m],A=E||_(m),P=m?x?_("entries"):A:void 0,O="Array"==t?C.entries||E:E;if(O&&(k=f(O.call(new e)))!==Object.prototype&&k.next&&(c(k,S,!0),r||s(k,d)||a(k,d,h)),x&&E&&"values"!==E.name&&(T=!0,A=function(){return E.call(this)}),r&&!y||!p&&!T&&C[d]||a(C,d,A),l[t]=A,l[S]=h,m)if(b={values:x?A:_("values"),keys:v?A:_("keys"),entries:P},y)for(w in b)w in C||o(C,w,b[w]);else i(i.P+i.F*(p||T),t,b);return b}},function(e,t,n){e.exports=n(12)},function(e,t,n){var r=n(7),i=n(13),o=n(65)(!1),a=n(22)("IE_PROTO");e.exports=function(e,t){var n,s=i(e),l=0,u=[];for(n in s)n!=a&&r(s,n)&&u.push(n);for(;t.length>l;)r(s,n=t[l++])&&(~o(u,n)||u.push(n));return u}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var r=n(43),i=n(29).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},function(e,t,n){var r=n(33),i=n(18),o=n(13),a=n(20),s=n(7),l=n(35),u=Object.getOwnPropertyDescriptor;t.f=n(5)?u:function(e,t){if(e=o(e),t=a(t,!0),l)try{return u(e,t)}catch(e){}if(s(e,t))return i(!r.f.call(e,t),e[t])}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(0),o=r(i),a=n(1),s=r(a);n(53);var l=n(37),u=r(l),c=n(54),f=r(c),d=n(91),p=r(d),h=n(92),g=r(h),m=n(93),v=r(m),y=n(94),b=r(y),w=n(95),k=r(w),_=n(96),S=r(_),x=function(){function e(t,n){(0,o.default)(this,e),this.container=(0,u.default)(t),this.providerClassMap={baidu:f.default,weibo:p.default,qq:g.default,qzone:v.default,douban:b.default,facebook:k.default,twitter:S.default},this.options=this._resolveOptions(n),this._resolveContainerClass(),this.providers=this._createProviders();for(var r in this.providers)this.container.append(this.providers[r].getElement())}return(0,s.default)(e,[{key:"getProvider",value:function(e){return void 0===this.providers[e]?null:this.providers[e]}},{key:"_createProviders",value:function(){var e={};for(var t in this.options)if(void 0!==this.providerClassMap[t]&&!1!==this.options[t]){var n=this._mergeProviderOptions(this.options[t]);e[t]=new this.providerClassMap[t](n)}return e}},{key:"_resolveOptions",value:function(e){return e=u.default.extend({theme:"default",weibo:!0,qq:!0,qzone:!0,baidu:!0,douban:!0,facebook:!0,twitter:!0},e),void 0===e.title&&(e.title=document.title),void 0===e.url&&(e.url=location.href),void 0===e.summary&&(e.summary=e.title),e}},{key:"_resolveContainerClass",value:function(){var e="social-share-button";this.options.theme&&(e+=" social-share-button-"+this.options.theme),this.container.addClass(e)}},{key:"_mergeProviderOptions",value:function(e){return!0===e&&(e={}),e.title||(e.title=this.options.title),e.url||(e.url=this.options.url),!e.image&&this.options.image&&(e.image=this.options.image),e.summary||(e.summary=this.options.summary),e.image&&(e.image=encodeURIComponent(e.image)),e.url=encodeURIComponent(e.url),e}}]),e}();e.exports=x},function(e,t,n){e.exports={default:n(50),__esModule:!0}},function(e,t,n){n(51);var r=n(3).Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},function(e,t,n){var r=n(11);r(r.S+r.F*!n(5),"Object",{defineProperty:n(4).f})},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(e){return(0,s.default)(this,t),e.desc||(e.desc=e.summary),e.comment||(e.comment=e.summary),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"tieba"}},{key:"_getUrlTemplate",value:function(){return"http://tieba.baidu.com/f/commit/share/openShareApi?url={url}&title={title}&desc={desc}&comment={comment}"}}]),t}(g.default);t.default=m},function(e,t,n){n(56),e.exports=n(3).Object.getPrototypeOf},function(e,t,n){var r=n(38),i=n(39);n(57)("getPrototypeOf",function(){return function(e){return i(r(e))}})},function(e,t,n){var r=n(11),i=n(3),o=n(17);e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],a={};a[e]=t(n),r(r.S+r.F*o(function(){n(1)}),"Object",a)}},function(e,t,n){e.exports={default:n(59),__esModule:!0}},function(e,t,n){n(60),n(69),e.exports=n(31).f("iterator")},function(e,t,n){"use strict";var r=n(61)(!0);n(41)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){var r=n(24),i=n(21);e.exports=function(e){return function(t,n){var o,a,s=String(i(t)),l=r(n),u=s.length;return l<0||l>=u?e?"":void 0:(o=s.charCodeAt(l),o<55296||o>56319||l+1===u||(a=s.charCodeAt(l+1))<56320||a>57343?e?s.charAt(l):o:e?s.slice(l,l+2):a-56320+(o-55296<<10)+65536)}}},function(e,t,n){"use strict";var r=n(27),i=n(18),o=n(30),a={};n(12)(a,n(14)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(a,{next:i(1,n)}),o(e,t+" Iterator")}},function(e,t,n){var r=n(4),i=n(15),o=n(28);e.exports=n(5)?Object.defineProperties:function(e,t){i(e);for(var n,a=o(t),s=a.length,l=0;s>l;)r.f(e,n=a[l++],t[n]);return e}},function(e,t,n){var r=n(44);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(13),i=n(66),o=n(67);e.exports=function(e){return function(t,n,a){var s,l=r(t),u=i(l.length),c=o(a,u);if(e&&n!=n){for(;u>c;)if((s=l[c++])!=s)return!0}else for(;u>c;c++)if((e||c in l)&&l[c]===n)return e||c||0;return!e&&-1}}},function(e,t,n){var r=n(24),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){var r=n(24),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):o(e,t)}},function(e,t,n){var r=n(2).document;e.exports=r&&r.documentElement},function(e,t,n){n(70);for(var r=n(2),i=n(12),o=n(26),a=n(14)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<s.length;l++){var u=s[l],c=r[u],f=c&&c.prototype;f&&!f[a]&&i(f,a,u),o[u]=o.Array}},function(e,t,n){"use strict";var r=n(71),i=n(72),o=n(26),a=n(13);e.exports=n(41)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(e,t){e.exports=function(){}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){e.exports={default:n(74),__esModule:!0}},function(e,t,n){n(75),n(80),n(81),n(82),e.exports=n(3).Symbol},function(e,t,n){"use strict";var r=n(2),i=n(7),o=n(5),a=n(11),s=n(42),l=n(76).KEY,u=n(17),c=n(23),f=n(30),d=n(19),p=n(14),h=n(31),g=n(32),m=n(77),v=n(78),y=n(15),b=n(13),w=n(20),k=n(18),_=n(27),S=n(79),x=n(47),T=n(4),C=n(28),E=x.f,A=T.f,P=S.f,O=r.Symbol,R=r.JSON,M=R&&R.stringify,N=p("_hidden"),L=p("toPrimitive"),I={}.propertyIsEnumerable,U=c("symbol-registry"),j=c("symbols"),B=c("op-symbols"),q=Object.prototype,F="function"==typeof O,D=r.QObject,z=!D||!D.prototype||!D.prototype.findChild,H=o&&u(function(){return 7!=_(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=E(q,t);r&&delete q[t],A(e,t,n),r&&e!==q&&A(q,t,r)}:A,Y=function(e){var t=j[e]=_(O.prototype);return t._k=e,t},W=F&&"symbol"==typeof O.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof O},V=function(e,t,n){return e===q&&V(B,t,n),y(e),t=w(t,!0),y(n),i(j,t)?(n.enumerable?(i(e,N)&&e[N][t]&&(e[N][t]=!1),n=_(n,{enumerable:k(0,!1)})):(i(e,N)||A(e,N,k(1,{})),e[N][t]=!0),H(e,t,n)):A(e,t,n)},$=function(e,t){y(e);for(var n,r=m(t=b(t)),i=0,o=r.length;o>i;)V(e,n=r[i++],t[n]);return e},G=function(e,t){return void 0===t?_(e):$(_(e),t)},X=function(e){var t=I.call(this,e=w(e,!0));return!(this===q&&i(j,e)&&!i(B,e))&&(!(t||!i(this,e)||!i(j,e)||i(this,N)&&this[N][e])||t)},Z=function(e,t){if(e=b(e),t=w(t,!0),e!==q||!i(j,t)||i(B,t)){var n=E(e,t);return!n||!i(j,t)||i(e,N)&&e[N][t]||(n.enumerable=!0),n}},J=function(e){for(var t,n=P(b(e)),r=[],o=0;n.length>o;)i(j,t=n[o++])||t==N||t==l||r.push(t);return r},K=function(e){for(var t,n=e===q,r=P(n?B:b(e)),o=[],a=0;r.length>a;)!i(j,t=r[a++])||n&&!i(q,t)||o.push(j[t]);return o};F||(O=function(){if(this instanceof O)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(n){this===q&&t.call(B,n),i(this,N)&&i(this[N],e)&&(this[N][e]=!1),H(this,e,k(1,n))};return o&&z&&H(q,e,{configurable:!0,set:t}),Y(e)},s(O.prototype,"toString",function(){return this._k}),x.f=Z,T.f=V,n(46).f=S.f=J,n(33).f=X,n(45).f=K,o&&!n(25)&&s(q,"propertyIsEnumerable",X,!0),h.f=function(e){return Y(p(e))}),a(a.G+a.W+a.F*!F,{Symbol:O});for(var Q="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;Q.length>ee;)p(Q[ee++]);for(var te=C(p.store),ne=0;te.length>ne;)g(te[ne++]);a(a.S+a.F*!F,"Symbol",{for:function(e){return i(U,e+="")?U[e]:U[e]=O(e)},keyFor:function(e){if(!W(e))throw TypeError(e+" is not a symbol!");for(var t in U)if(U[t]===e)return t},useSetter:function(){z=!0},useSimple:function(){z=!1}}),a(a.S+a.F*!F,"Object",{create:G,defineProperty:V,defineProperties:$,getOwnPropertyDescriptor:Z,getOwnPropertyNames:J,getOwnPropertySymbols:K}),R&&a(a.S+a.F*(!F||u(function(){var e=O();return"[null]"!=M([e])||"{}"!=M({a:e})||"{}"!=M(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!W(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!W(t))return t}),r[1]=t,M.apply(R,r)}}}),O.prototype[L]||n(12)(O.prototype,L,O.prototype.valueOf),f(O,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(e,t,n){var r=n(19)("meta"),i=n(16),o=n(7),a=n(4).f,s=0,l=Object.isExtensible||function(){return!0},u=!n(17)(function(){return l(Object.preventExtensions({}))}),c=function(e){a(e,r,{value:{i:"O"+ ++s,w:{}}})},f=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!l(e))return"F";if(!t)return"E";c(e)}return e[r].i},d=function(e,t){if(!o(e,r)){if(!l(e))return!0;if(!t)return!1;c(e)}return e[r].w},p=function(e){return u&&h.NEED&&l(e)&&!o(e,r)&&c(e),e},h=e.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},function(e,t,n){var r=n(28),i=n(45),o=n(33);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var a,s=n(e),l=o.f,u=0;s.length>u;)l.call(e,a=s[u++])&&t.push(a);return t}},function(e,t,n){var r=n(44);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){var r=n(13),i=n(46).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return a.slice()}};e.exports.f=function(e){return a&&"[object Window]"==o.call(e)?s(e):i(r(e))}},function(e,t){},function(e,t,n){n(32)("asyncIterator")},function(e,t,n){n(32)("observable")},function(e,t,n){e.exports={default:n(84),__esModule:!0}},function(e,t,n){n(85),e.exports=n(3).Object.setPrototypeOf},function(e,t,n){var r=n(11);r(r.S,"Object",{setPrototypeOf:n(86).set})},function(e,t,n){var r=n(16),i=n(15),o=function(e,t){if(i(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{r=n(34)(Function.call,n(47).f(Object.prototype,"__proto__").set,2),r(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,n){return o(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:o}},function(e,t,n){e.exports={default:n(88),__esModule:!0}},function(e,t,n){n(89);var r=n(3).Object;e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){var r=n(11);r(r.S,"Object",{create:n(27)})},function(e,t,n){"use strict";function r(e,t,n){var r=void 0,i=void 0,o=void 0,a=void 0;return t&&n?(i=document.documentElement.clientWidth/2-t/2,o=(document.documentElement.clientHeight-n)/2,a="status=1,resizable=yes,width="+t+",height="+n+",top="+o+",left="+i,r=window.open(e,"",a)):r=window.open(e),r}Object.defineProperty(t,"__esModule",{value:!0}),t.openWin=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"weibo"}},{key:"_getUrlTemplate",value:function(){return"http://service.weibo.com/share/share.php?url={url}&appkey={appKey}&title={title}&pic={image}&searchPic=true"}}]),t}(g.default);t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(e){return(0,s.default)(this,t),e.desc||(e.desc=e.summary),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"qq"}},{key:"_getUrlTemplate",value:function(){return"http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&source={source}&desc={desc}&pics={image}"}}]),t}(g.default);t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(e){return(0,s.default)(this,t),e.desc||(e.desc=e.summary),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"qzone"}},{key:"_getUrlTemplate",value:function(){return"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&desc={desc}&summary={summary}&site={site}"}}]),t}(g.default);t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"douban"}},{key:"_getUrlTemplate",value:function(){return"https://www.douban.com/share/service?name={title}&href={url}&image={image}&url={url}&title={title}"}}]),t}(g.default);t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"facebook"}},{key:"_getUrlTemplate",value:function(){return"https://www.facebook.com/sharer.php?s=100&p[url]={url}&p[images][0]={image}&p[title]={title}&p[summary]={summary}"}}]),t}(g.default);t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i),a=n(0),s=r(a),l=n(1),u=r(l),c=n(8),f=r(c),d=n(9),p=r(d),h=n(10),g=r(h),m=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,u.default)(t,[{key:"getName",value:function(){return"twitter"}},{key:"_getUrlTemplate",value:function(){return"https://twitter.com/intent/tweet?url={url}&text={title}&via={via}&hashtags={hashtags}"}}]),t}(g.default);t.default=m}])})},/***/
jSka:/***/
function(e,t){/*jslint newcap: true */
/*global XMLHttpRequest: false, FormData: false */
/*
 * Inline Text Attachment
 *
 * Author: Roy van Kaathoven
 * Contact: ik@royvankaathoven.nl
 */
!function(e,t){"use strict";var n=function(e,t){this.settings=n.util.merge(e,n.defaults),this.editor=t,this.filenameTag="{filename}",this.lastValue=null};/**
   * Will holds the available editors
   *
   * @type {Object}
   */
n.editors={},/**
   * Utility functions
   */
n.util={/**
     * Simple function to merge the given objects
     *
     * @param {Object[]} object Multiple object parameters
     * @returns {Object}
     */
merge:function(){for(var e={},t=arguments.length-1;t>=0;t--){var n=arguments[t];for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e},/**
     * Append a line of text at the bottom, ensuring there aren't unnecessary newlines
     *
     * @param {String} appended Current content
     * @param {String} previous Value which should be appended after the current content
     */
appendInItsOwnLine:function(e,t){return(e+"\n\n[[D]]"+t).replace(/(\n{2,})\[\[D\]\]/,"\n\n").replace(/^(\n*)/,"")},/**
     * Inserts the given value at the current cursor position of the textarea element
     *
     * @param  {HtmlElement} el
     * @param  {String} value Text which will be inserted at the cursor position
     */
insertTextAtCursor:function(t,n){var r,i=t.scrollTop,o=0,a=!1;t.selectionStart||"0"===t.selectionStart?a="ff":e.selection&&(a="ie"),"ie"===a?(t.focus(),r=e.selection.createRange(),r.moveStart("character",-t.value.length),o=r.text.length):"ff"===a&&(o=t.selectionStart);var s=t.value.substring(0,o),l=t.value.substring(o,t.value.length);t.value=s+n+l,o+=n.length,"ie"===a?(t.focus(),r=e.selection.createRange(),r.moveStart("character",-t.value.length),r.moveStart("character",o),r.moveEnd("character",0),r.select()):"ff"===a&&(t.selectionStart=o,t.selectionEnd=o,t.focus()),t.scrollTop=i}},/**
   * Default configuration options
   *
   * @type {Object}
   */
n.defaults={/**
     * URL where the file will be send
     */
uploadUrl:"upload_attachment.php",/**
     * Which method will be used to send the file to the upload URL
     */
uploadMethod:"POST",/**
     * Name in which the file will be placed
     */
uploadFieldName:"file",/**
     * Extension which will be used when a file extension could not
     * be detected
     */
defaultExtension:"png",/**
     * JSON field which refers to the uploaded file URL
     */
jsonFieldName:"filename",/**
     * Allowed MIME types
     */
allowedTypes:["image/jpeg","image/png","image/jpg","image/gif"],/**
     * Text which will be inserted when dropping or pasting a file.
     * Acts as a placeholder which will be replaced when the file is done with uploading
     */
progressText:"![Uploading file...]()",/**
     * When a file has successfully been uploaded the progressText
     * will be replaced by the urlText, the {filename} tag will be replaced
     * by the filename that has been returned by the server
     */
urlText:"![file]({filename})",/**
     * Text which will be used when uploading has failed
     */
errorText:"Error uploading file",/**
     * Extra parameters which will be send when uploading a file
     */
extraParams:{},/**
     * Extra headers which will be send when uploading a file
     */
extraHeaders:{},/**
     * Before the file is send
     */
beforeFileUpload:function(){return!0},/**
     * Triggers when a file is dropped or pasted
     */
onFileReceived:function(){},/**
     * Custom upload handler
     *
     * @return {Boolean} when false is returned it will prevent default upload behavior
     */
onFileUploadResponse:function(){return!0},/**
     * Custom error handler. Runs after removing the placeholder text and before the alert().
     * Return false from this function to prevent the alert dialog.
     *
     * @return {Boolean} when false is returned it will prevent default error behavior
     */
onFileUploadError:function(){return!0},/**
     * When a file has succesfully been uploaded
     */
onFileUploaded:function(){}},/**
   * Uploads the blob
   *
   * @param  {Blob} file blob data received from event.dataTransfer object
   * @return {XMLHttpRequest} request object which sends the file
   */
n.prototype.uploadFile=function(e){var t=this,n=new FormData,r=new XMLHttpRequest,i=this.settings,o=i.defaultExtension||i.defualtExtension;
// Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
// http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
if("function"==typeof i.setupFormData&&i.setupFormData(n,e),e.name){var a=e.name.match(/\.(.+)$/);a&&(o=a[1])}var s="image-"+Date.now()+"."+o;
// Append the extra parameters to the formdata
if("function"==typeof i.remoteFilename&&(s=i.remoteFilename(e)),n.append(i.uploadFieldName,e,s),"object"==typeof i.extraParams)for(var l in i.extraParams)i.extraParams.hasOwnProperty(l)&&n.append(l,i.extraParams[l]);
// Add any available extra headers
if(r.open("POST",i.uploadUrl),"object"==typeof i.extraHeaders)for(var u in i.extraHeaders)i.extraHeaders.hasOwnProperty(u)&&r.setRequestHeader(u,i.extraHeaders[u]);return r.onload=function(){
// If HTTP status is OK or Created
200===r.status||201===r.status?t.onFileUploadResponse(r):t.onFileUploadError(r)},!1!==i.beforeFileUpload(r)&&r.send(n),r},/**
   * Returns if the given file is allowed to handle
   *
   * @param {File} clipboard data file
   */
n.prototype.isFileAllowed=function(e){return"string"!==e.kind&&(0===this.settings.allowedTypes.indexOf("*")||this.settings.allowedTypes.indexOf(e.type)>=0)},/**
   * Handles upload response
   *
   * @param  {XMLHttpRequest} xhr
   * @return {Void}
   */
n.prototype.onFileUploadResponse=function(e){if(!1!==this.settings.onFileUploadResponse.call(this,e)){var t=JSON.parse(e.responseText),n=t[this.settings.jsonFieldName];if(t&&n){var r;r="function"==typeof this.settings.urlText?this.settings.urlText.call(this,n,t):this.settings.urlText.replace(this.filenameTag,n);var i=this.editor.getValue().replace(this.lastValue,r);this.editor.setValue(i),this.settings.onFileUploaded.call(this,n)}}},/**
   * Called when a file has failed to upload
   *
   * @param  {XMLHttpRequest} xhr
   * @return {Void}
   */
n.prototype.onFileUploadError=function(e){if(!1!==this.settings.onFileUploadError.call(this,e)){var t=this.editor.getValue().replace(this.lastValue,"");this.editor.setValue(t)}},/**
   * Called when a file has been inserted, either by drop or paste
   *
   * @param  {File} file
   * @return {Void}
   */
n.prototype.onFileInserted=function(e){!1!==this.settings.onFileReceived.call(this,e)&&(this.lastValue=this.settings.progressText,this.editor.insertValue(this.lastValue))},/**
   * Called when a paste event occured
   * @param  {Event} e
   * @return {Boolean} if the event was handled
   */
n.prototype.onPaste=function(e){var t,n=!1,r=e.clipboardData;if("object"==typeof r){t=r.items||r.files||[];for(var i=0;i<t.length;i++){var o=t[i];this.isFileAllowed(o)&&(n=!0,this.onFileInserted(o.getAsFile()),this.uploadFile(o.getAsFile()))}}return n&&e.preventDefault(),n},/**
   * Called when a drop event occures
   * @param  {Event} e
   * @return {Boolean} if the event was handled
   */
n.prototype.onDrop=function(e){for(var t=!1,n=0;n<e.dataTransfer.files.length;n++){var r=e.dataTransfer.files[n];this.isFileAllowed(r)&&(t=!0,this.onFileInserted(r),this.uploadFile(r))}return t},t.inlineAttachment=n}(document,window)},/***/
kEX9:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
// Because sometimes you need to mark the selected *text*.
//
// Adds an option 'styleSelectedText' which, when enabled, gives
// selected text the CSS class given as option value, or
// "CodeMirror-selectedtext" when the value is not a string.
!function(e){// CommonJS
e(n("U66f"))}(function(e){"use strict";function t(e){e.state.markedSelection&&e.operation(function(){a(e)})}function n(e){e.state.markedSelection&&e.state.markedSelection.length&&e.operation(function(){i(e)})}function r(e,t,n,r){if(0!=u(t,n))for(var i=e.state.markedSelection,o=e.state.markedSelectionStyle,a=t.line;;){var c=a==t.line?t:l(a,0),f=a+s,d=f>=n.line,p=d?n:l(f,0),h=e.markText(c,p,{className:o});if(null==r?i.push(h):i.splice(r++,0,h),d)break;a=f}}function i(e){for(var t=e.state.markedSelection,n=0;n<t.length;++n)t[n].clear();t.length=0}function o(e){i(e);for(var t=e.listSelections(),n=0;n<t.length;n++)r(e,t[n].from(),t[n].to())}function a(e){if(!e.somethingSelected())return i(e);if(e.listSelections().length>1)return o(e);var t=e.getCursor("start"),n=e.getCursor("end"),a=e.state.markedSelection;if(!a.length)return r(e,t,n);var l=a[0].find(),c=a[a.length-1].find();if(!l||!c||n.line-t.line<=s||u(t,c.to)>=0||u(n,l.from)<=0)return o(e);for(;u(t,l.from)>0;)a.shift().clear(),l=a[0].find();for(u(t,l.from)<0&&(l.to.line-t.line<s?(a.shift().clear(),r(e,t,l.to,0)):r(e,t,l.from,0));u(n,c.to)<0;)a.pop().clear(),c=a[a.length-1].find();u(n,c.to)>0&&(n.line-c.from.line<s?(a.pop().clear(),r(e,c.from,n)):r(e,c.to,n))}e.defineOption("styleSelectedText",!1,function(r,a,s){var l=s&&s!=e.Init;a&&!l?(r.state.markedSelection=[],r.state.markedSelectionStyle="string"==typeof a?a:"CodeMirror-selectedtext",o(r),r.on("cursorActivity",t),r.on("change",n)):!a&&l&&(r.off("cursorActivity",t),r.off("change",n),i(r),r.state.markedSelection=r.state.markedSelectionStyle=null)});var s=8,l=e.Pos,u=e.cmpPos})},/***/
wGMW:/***/
function(e,t,n){"use strict";/* WEBPACK VAR INJECTION */
(function(e){function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n("AA3o"),o=r(i);n("2SKx");var a=n("Jov0"),s=(r(a),function t(n,r){var i=this;(0,o.default)(this,t),e.pjax.defaults.timeout=5e4,this.element=n,this.container=e(r.container),this.element.pjax("li a",r.container),this.options=r,this.element.on("pjax:click",function(t){e(t.target).parent().siblings().removeClass("active").end().addClass("active")}),this.loader=e(this.options.loader),
//绑定事件
e(document).on("pjax:beforeSend",function(e,t,n){"function"==typeof i.options.before&&i.options.before.call(i,i.container,t),i.loader.show()}),e(document).on("pjax:success",function(e,t,n,r,o){"function"==typeof i.options.success&&i.options.success.call(i,i.container,r,t,n,o)}),e(document).on("pjax:complete",function(e,t,n,r){"function"==typeof i.options.complete&&i.options.complete.call(i,e,t,n,r),i.loader.hide()})});t.default=s}).call(t,n("9ZC0"))},/***/
xnXw:/***/
function(e,t,n){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
// Utility function that allows modes to be combined. The mode given
// as the base argument takes care of most of the normal mode
// functionality, but a second (typically simple) mode is used, which
// can override the style of text. Both modes get to parse all of the
// text, but when both assign a non-null style to a piece of code, the
// overlay wins, unless the combine argument was true and not overridden,
// or state.overlay.combineTokens was true, in which case the styles are
// combined.
!function(e){// CommonJS
e(n("U66f"))}(function(e){"use strict";e.overlayMode=function(t,n,r){return{startState:function(){return{base:e.startState(t),overlay:e.startState(n),basePos:0,baseCur:null,overlayPos:0,overlayCur:null,streamSeen:null}},copyState:function(r){return{base:e.copyState(t,r.base),overlay:e.copyState(n,r.overlay),basePos:r.basePos,baseCur:null,overlayPos:r.overlayPos,overlayCur:null}},token:function(e,i){
// state.overlay.combineTokens always takes precedence over combine,
// unless set to null
// state.overlay.combineTokens always takes precedence over combine,
// unless set to null
return(e!=i.streamSeen||Math.min(i.basePos,i.overlayPos)<e.start)&&(i.streamSeen=e,i.basePos=i.overlayPos=e.start),e.start==i.basePos&&(i.baseCur=t.token(e,i.base),i.basePos=e.pos),e.start==i.overlayPos&&(e.pos=e.start,i.overlayCur=n.token(e,i.overlay),i.overlayPos=e.pos),e.pos=Math.min(i.basePos,i.overlayPos),null==i.overlayCur?i.baseCur:null!=i.baseCur&&i.overlay.combineTokens||r&&null==i.overlay.combineTokens?i.baseCur+" "+i.overlayCur:i.overlayCur},indent:t.indent&&function(e,n){return t.indent(e.base,n)},electricChars:t.electricChars,innerMode:function(e){return{state:e.base,mode:t}},blankLine:function(e){var i,o;return t.blankLine&&(i=t.blankLine(e.base)),n.blankLine&&(o=n.blankLine(e.overlay)),null==o?i:r&&null!=i?i+" "+o:o}}}})},/***/
ylcc:/***/
function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n("AA3o"),o=r(i);n("jSka"),n("b77J"),n("Tktu");var a=n("9ZC0"),s=r(a),l=n("Jov0"),u=r(l),c=function e(t,n){(0,o.default)(this,e),n=s.default.extend({uploadUrl:u.default.route.getRoutePath("upload"),jsonFieldName:"path"},n),t instanceof s.default?t.inlineattachment(n):inlineAttachment.editors.codemirror4.attach(t,n)};t.default=c}},["VQun"]);