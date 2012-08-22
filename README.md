Potassium: explosive JS
=======================

Potassium (K) is a tiny JavaScript library that offers a very minimal but extremely useful set of utilities.

Current version: 1.0.0 (semver)

API
===

Potassium (K) has a minimal but powerful API.

Where applicable it offers fluent interfaces.

construct () : Potassium
------------------------

Creates a new Potassium (K) instance.

This is managed through a singleton, therefore any subsequent call to this method will return the very same instance.

Provides fluent interfaces.

hop ( object : Object, property : String ) : Boolean
----------------------------------------------------

Determines whether an object features a particular property.

Basically, it's a safe alias to Object.prototype.hasOwnProperty .

isEmpty ( value : * ) : Boolean
-------------------------------

Determines whether the value is empty.

isNull ( value : * ) : Boolean
------------------------------

Determines whether the value is null.

isUndefined ( value : * ) : Boolean
-----------------------------------

Determines whether the value is undefined.

namespace ( chain : String, initialization : * ) : Potassium
------------------------------------------------------------

Creates a new namespace under the Potassium (K) namespace.

This way it's possible to create and (optionally) initialize new applications.

Provides fluent interfaces.

noop () : undefined
-------------------

A NOOP. Nuff said.

pie ( object : Object, property : String ) : Boolean
----------------------------------------------------

Determines whether a property of an object is enumerable in for...in loops.

Basically, it's a safe alias to Object.prototype.propertyIsEnumerable .

typeOf ( value : * ) : String
-----------------------------

A reliable alternative to the typeof operator.

License and Copyright
=====================

Potassium (K) is Copyright (c) 2012 Massimo Lombardo and is available under the terms of the Apache Software License 2.0 .
