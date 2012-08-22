/*!
 * Potassium: explosive JS | v1.0.0 | https://github.com/unwiredbrain/Potassium
 * 
 *    Copyright 2012 Massimo Lombardo
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */


/**
 * Instantiates, sets up and exposes the Potassium (K) object.
 * 
 * @param {object} root The root element.
 */
(function (root) {


    "use strict";


    /**
     * Where the magic happens.
     * 
     * Creates the Potassium (K) object trough an IIFE and using the revealing pattern.
     * 
     * @param {bool} TRUE A pure boolean true value.
     * @param {bool} FALSE A pure boolean false value.
     * @param {null} NULL A pure null value.
     * @param {undefined} UNDEFINED A pure undefined value.
     * @return {object} The Potassium (K) API.
     */
    var K = (function (TRUE, FALSE, NULL, UNDEFINED) {


        /**
         * The Potassium (K) instance holder.
         * 
         * @type {object}
         */
        var that;


        /**
         * A shortcut to Object.prototype cached for minification reasons.
         * 
         * @type {object}
         */
        var objectPrototype = Object.prototype;


        /**
         * Whether the Potassium (K) object is already instanced or not.
         * 
         * False by default, it'll be changed during the object instantiation.
         * This control will prevent the Potassium (K) object to be (re)instanced multiple times.
         * 
         * @type {bool}
         */
        var isConstructed = FALSE;


        /**
         * The constructor, easy as pie.
         * 
         * Scroll to the end of the IIFE to see its usage.
         * 
         * @return {object} The Potassium (K) instance, so to enable fluent interfaces.
         */
        function construct() {
            if (!isConstructed) {
                that = this;
                isConstructed = TRUE;
            }
            return that;
        }


        /**
         * Safe shortcut to Object.prototype.hasOwnProperty.
         * 
         * @param {object} object The object to inspect.
         * @param {string} member The property to check.
         * @return {bool} Whether the member is an own property of the object.
         */
        function hop(object, member) {
            return objectPrototype.hasOwnProperty.call(object, member);
        }


        /**
         * Checks whether a value is empty.
         * 
         * A string and an array can be empty only if their length property is equal to zero.
         * An object is empty only if it has no members to explore.
         * Undefned and null values are empty by default.
         * 
         * @param {*} object The object to inspect.
         * @return {bool} Whether the object value is empty.
         */
        function isEmpty(object) {
            var member;
            if (isNull(object) || isUndefined(object) || (typeOf(object) in { "Array": 1, "String": 1 } && 0 === object.length)) {
                return TRUE;
            }
            if ("Object" === typeOf(object)) {
                for (member in object) {
                    if (hop(object, member) && pie(object, member)) {
                        return FALSE;
                    }
                }
                return TRUE;
            }
            return FALSE;
        }


        /**
         * Checks whether a value is null.
         * 
         * @param {*} object The object to inspect.
         * @return {bool} Whether the object value is null.
         */
        function isNull(object) {
            return NULL === object;
        }


        /**
         * Checks whether a value is undefined.
         * 
         * @param {*} object The object to inspect.
         * @return {bool} Whether the object value is undefined.
         */
        function isUndefined(object) {
            return UNDEFINED === object;
        }


        /**
         * Creates a new namespace under the Potassium (K) namespace.
         * 
         * If no initialization is given an empty object will be used.
         * 
         * Example usage:
         * 
         * The following will create K.Foo.Bar and will initialize it to {} :
         * 
         *     K.namespace("Foo.Bar");
         * 
         * The following will create K.Foo.Bar and will initialize it to "baz" :
         * 
         *     K.namespace("K.Foo.Bar", "baz");
         * 
         *     As you can see, the "K" namespace can be omitted, it'll be skipped internally anyway.
         * 
         * A more complex example; the fluent interface can be handy in many ways:
         * 
         *     K.namespace("Foo", {
         *         "bar": "baz",
         *         "orly": 1,
         *         "yrly": function () {
         *             return "cool";
         *         }
         *     }).namespace("Apple", (function () {
         *         var fruit;
         *         function pear() {
         *             fruit = "pear";
         *         }
         *         return {
         *             "isModule": true,
         *             "isRevealing": true,
         *             "pear": pear
         *         };
         *     }()));
         * 
         *     The above will instantiate two namespaces: K.Foo and K.Apple and each of them will be initialized.
         * 
         * @param {string} chain The namespace to initialize.
         * @param {*} initialization The object that will be used to initialize the namespace. Optional.
         * @return {object} The Potassium (K) instance so to enable fluent interfaces.
         */
        function namespace(chain, initialization) {
            var links,
                link,
                last,
                base = that;
            chain = (chain || "").split(".");
            for (link = "K" === chain[0] ? 1 : 0, links = chain.length, last = links - 1; link < links; link += 1) {
                base[chain[link]] = base[chain[link]] || {};
                if (link === last && initialization) {
                    base[chain[link]] = initialization;
                }
                base = base[chain[link]];
            }
            return that;
        }


        /**
         * A noop. Nuff said.
         */
        function noop() {
            // Nothing here.
        }


        /**
         * Safe shortcut to Object.prototype.propertyIsEnumerable.
         * 
         * @param {object} object The object to inspect.
         * @param {string} member The property to check.
         * @return {bool} Whether the member of the object is enumerable.
         */
        function pie(object, member) {
            return objectPrototype.propertyIsEnumerable.call(object, member);
        }


        /**
         * A 'real' typeof operator alternative that doesn't suck.
         * 
         * @param {*} object The object to inspect.
         * @return {string} The type of the inspected object.
         */
        function typeOf(object) {
            return objectPrototype.toString.call(object).slice(8, -1);
        }


        /**
         * Exposes the public API.
         * 
         * @type {object}
         */
        return {
            "construct": construct,
            "hop": hop,
            "isEmpty": isEmpty,
            "isNull": isNull,
            "isUndefined": isUndefined,
            "namespace": namespace,
            "noop": noop,
            "pie": pie,
            "typeOf": typeOf
        };


    }(true, false, null)); // No undefined value ...you get it?


    // Sets up the internal 'this'.
    K.construct();


    // Attaches the inner object to the root element.
    root.K = K;


}(this));
