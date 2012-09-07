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
 * @param {object} root The host root element.
 */
(function (root) {


    "use strict";


    /**
     * Where the magic happens.
     * 
     * Creates the Potassium (K) object trough an IIFE and using the revealing pattern.
     * 
     * @param {bool} TRUE A pure boolean true value. Minimization helper.
     * @param {bool} FALSE A pure boolean false value. Minimization helper.
     * @param {null} NULL A pure null value. Minimization helper.
     * @param {undefined} UNDEFINED A pure undefined value. Minimization helper. DO NOT FUCKING USE.
     * @return {object} The Potassium (K) API.
     */
    var K = (function (TRUE, FALSE, NULL, UNDEFINED) {


        /**
         * The Potassium (K) instance holder.
         * 
         * @private
         * @type {object}
         */
        var that;


        /**
         * A shortcut to Object.prototype cached for minification reasons.
         * 
         * @private
         * @type {object}
         */
        var objectPrototype = Object.prototype;


        /**
         * Whether the Potassium (K) object is already instanced or not.
         * 
         * False by default, it'll be changed during the object instantiation.
         * This control will prevent the Potassium (K) object to be (re)instanced multiple times.
         * 
         * @private
         * @type {bool}
         */
        var isConstructed = FALSE;


        /**
         * Constructor (sort of)
         * 
         * Updates the pointer to the (internally) shared Potassium (K) instance.
         * Don't get it? Look right below the end of the main Potassium (K) IIFE.
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
         * @param {string} property The property to check.
         * @return {bool} Whether the property given is an own property of the object.
         */
        function hop(object, property) {
            return objectPrototype.hasOwnProperty.call(object, property);
        }


        /**
         * Checks whether a value is empty.
         * 
         * A string and an array can be empty only if their length property is equal to zero.
         * An object is empty only if it has no own members to explore.
         * Undefined and null values are empty by default.
         * 
         * @param {mixed} value The value to inspect.
         * @return {bool} Whether the value is empty.
         */
        function isEmpty(value) {
            var member;
            if (isNull(value) || isUndefined(value) || (typeOf(value) in { "Array": 1, "String": 1 } && 0 === value.length)) {
                return TRUE;
            }
            if ("Object" === typeOf(value)) {
                for (member in value) {
                    if (hop(value, member) && pie(value, member)) {
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
         * @param {mixed} value The value to inspect.
         * @return {bool} Whether the value is null.
         */
        function isNull(value) {
            return NULL === value;
        }


        /**
         * Checks whether a value is undefined.
         * 
         * @param {mixed} value The value to inspect.
         * @return {bool} Whether the value is undefined.
         */
        function isUndefined(value) {
            return UNDEFINED === value;
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
         * @param {mixed} initialization What will be used to initialize the namespace. Optional.
         * @return {object} The Potassium (K) instance so to enable fluent interfaces.
         */
        function namespace(chain, initialization) {
            var links,
                link,
                last,
                base = that;
            initialization = initialization || {};
            chain = (chain || "").split(".");
            for (link = "K" === chain[0] ? 1 : 0, links = chain.length, last = links - 1; link < links; link += 1) {
                base[chain[link]] = base[chain[link]] || link === last ? initialization : {};
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
         * @param {string} property The property to check.
         * @return {bool} Whether the given property of the object is enumerable.
         */
        function pie(object, property) {
            return objectPrototype.propertyIsEnumerable.call(object, property);
        }


        /**
         * A 'real' typeof operator alternative that doesn't suck that much.
         * 
         * @param {mixed} value The value to inspect.
         * @return {string} The type of the inspected value.
         */
        function typeOf(value) {
            return objectPrototype.toString.call(value).slice(8, -1);
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


    // Attaches the inner Potassium (K) instance to the root element.
    root.K = K;


}(this));
