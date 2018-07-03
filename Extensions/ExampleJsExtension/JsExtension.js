/**
 * This is a declaration of an extension for GDevelop 5.
 *
 * ℹ️ Run `node import-GDJS-Runtime.js` (in newIDE/app/scripts) if you make any change
 * to this extension file or to any other *.js file that you reference inside.
 *
 * The file must be named "JsExtension.js", otherwise GDevelop won't load it.
 * ⚠️ If you make a change and the extension is not loaded, open the developer console
 * and search for any errors.
 *
 * More information on https://github.com/4ian/GD/blob/master/newIDE/README-extensions.md
 */
module.exports = {
  createExtension: (t, gd) => {
    const extension = new gd.PlatformExtension();
    extension.setExtensionInformation(
      "MyDummyExtension",
      "My Dummy Extension",
      "An example of a declaration of an extension",
      "Florian Rival",
      "MIT"
    );

    // Declare conditions, actions or expressions:
    extension
      .addCondition(
        "MyNewCondition",
        "Dummy condition example",
        "This is an example of a condition displayed in the events sheet. Will return true if the number is less than 10 and the length of the text is less than 5.",
        "Call the example condition with _PARAM0_ and _PARAM1_",
        "Dummy Extension",
        "res/conditions/camera24.png",
        "res/conditions/camera.png"
      )
      .addParameter("expression", "Number 1", "", false)
      .addParameter("string", "Text 1", "", false)
      .getCodeExtraInformation()
      .setIncludeFile(
        "Extensions/ExampleJsExtension/examplejsextensiontools.js"
      )
      .setFunctionName("gdjs.evtTools.exampleJsExtension.myConditionFunction");

    extension
      .addExpression(
        "DummyExpression",
        "Dummy expression example",
        "This is an example of an expression",
        "Dummy Extension",
        "res/actions/camera.png"
      )
      .addParameter("expression", "Maximum", "", false)
      .getCodeExtraInformation()
      .setFunctionName("gdjs.random");

    extension
      .addStrExpression(
        "DummyStrExpression",
        t("Dummy string expression example"),
        t("This is an example of an expression returning a string"),
        t("Dummy Extension"),
        "res/actions/camera.png"
      )
      .getCodeExtraInformation()
      .setIncludeFile(
        "Extensions/FacebookInstantGames/facebookinstantgamestools.js"
      )
      .setFunctionName("gdjs.evtTools.exampleJsExtension.getString");

    // Declare a behavior.
    // Create a new gd.BehaviorJsImplementation object and implement the methods
    // that are called to get and set the properties of the behavior.
    // Everything that is stored inside the behavior is in "behaviorContent" and is automatically
    // saved/loaded to JSON.
    var dummyBehavior = new gd.BehaviorJsImplementation();
    dummyBehavior.updateProperty = function(behaviorContent, propertyName, newValue) {
      if (propertyName === "My first property") {
        behaviorContent.property1 = newValue;
        return true;
      }
      if (propertyName === "My other property") {
        behaviorContent.property2 = newValue === "1";
        return true;
      }

      return false;
    };
    dummyBehavior.getProperties = function(behaviorContent) {
      var behaviorProperties = new gd.MapStringPropertyDescriptor();

      behaviorProperties.set(
        "My first property",
        new gd.PropertyDescriptor(behaviorContent.property1)
      );
      behaviorProperties.set(
        "My other property",
        new gd.PropertyDescriptor(behaviorContent.property2 ? "true" : "false").setType(
          "Boolean"
        )
      );

      return behaviorProperties;
    };
    dummyBehavior.setRawJSONContent(
      JSON.stringify({
        property1: "Initial value 1",
        property2: true
      })
    );
    extension
      .addBehavior(
        "DummyBehavior",
        t("Dummy behavior for testing"),
        "DummyBehavior",
        t("This dummy behavior does nothing"),
        "",
        "CppPlatform/Extensions/topdownmovementicon.png",
        "DummyBehavior",
        dummyBehavior,
        new gd.BehaviorsSharedData()
      )
      .setIncludeFile("Extensions/ExampleJsExtension/dummyruntimebehavior.js");

    // Declare another behavior, with shared data between the behaviors
    // In addition to the usual behavior:
    // Create a new gd.BehaviorSharedDataJsImplementation object and implement the methods
    // that are called to get and set the properties of the shared data.
    var dummyBehaviorWithSharedData = new gd.BehaviorJsImplementation();
    dummyBehaviorWithSharedData.updateProperty = function(behaviorContent, propertyName, newValue) {
      if (propertyName === "My behavior property") {
        behaviorContent.property1 = newValue;
        return true;
      }

      return false;
    };
    dummyBehaviorWithSharedData.getProperties = function(behaviorContent) {
      var behaviorProperties = new gd.MapStringPropertyDescriptor();

      behaviorProperties.set(
        "My behavior property",
        new gd.PropertyDescriptor(behaviorContent.property1)
      );

      return behaviorProperties;
    };
    dummyBehaviorWithSharedData.setRawJSONContent(
      JSON.stringify({
        property1: "Initial value 1",
      })
    );

    var sharedData = new gd.BehaviorSharedDataJsImplementation();
    sharedData.updateProperty = function(sharedContent, propertyName, newValue) {
      if (propertyName === "My shared property") {
        sharedContent.sharedProperty1 = newValue;
        return true;
      }

      return false;
    };
    sharedData.getProperties = function(sharedContent) {
      var sharedProperties = new gd.MapStringPropertyDescriptor();

      sharedProperties.set(
        "My shared property",
        new gd.PropertyDescriptor(sharedContent.sharedProperty1 || '')
      );

      return sharedProperties;
    };
    sharedData.setRawJSONContent(
      JSON.stringify({
        sharedProperty1: "Initial shared value 1",
      })
    );
    extension
      .addBehavior(
        "DummyBehaviorWithSharedData",
        t("Dummy behavior with shared data for testing"),
        "DummyBehaviorWithSharedData",
        t("This dummy behavior uses shared data and does nothing"),
        "",
        "CppPlatform/Extensions/topdownmovementicon.png",
        "DummyBehaviorWithSharedData",
        dummyBehaviorWithSharedData,
        sharedData,
      )
      .setIncludeFile("Extensions/ExampleJsExtension/dummywithshareddataruntimebehavior.js");

    // Declare an object.
    // Create a new gd.ObjectJsImplementation object and implement the methods
    // that are called to get and set the properties of the object, as well
    // as the properties of the initial instances of this object
    // Everything that is stored inside the object is in "content" and is automatically
    // saved/loaded to JSON.
    var dummyObject = new gd.ObjectJsImplementation();
    dummyObject.updateProperty = function(objectContent, propertyName, newValue) {
      if (propertyName === "My first property") {
        objectContent.property1 = newValue;
        return true;
      }
      if (propertyName === "My other property") {
        objectContent.property2 = newValue === "1";
        return true;
      }
      if (propertyName === "My third property") {
        objectContent.property3 = newValue;
        return true;
      }

      return false;
    };
    dummyObject.getProperties = function(objectContent) {
      var objectProperties = new gd.MapStringPropertyDescriptor();

      objectProperties.set(
        "My first property",
        new gd.PropertyDescriptor(objectContent.property1)
      );
      objectProperties.set(
        "My other property",
        new gd.PropertyDescriptor(objectContent.property2 ? "true" : "false").setType(
          "boolean"
        )
      );
      objectProperties.set(
        "My third property",
        new gd.PropertyDescriptor(objectContent.property3.toString()).setType(
          "number"
        )
      );

      return objectProperties;
    };
    dummyObject.setRawJSONContent(
      JSON.stringify({
        property1: "Initial value",
        property2: true,
        property3: 123
      })
    );

    dummyObject.updateInitialInstanceProperty = function(
      objectContent,
      instance,
      propertyName,
      newValue,
      project,
      layout
    ) {
      if (propertyName === "My instance property") {
        instance.setRawStringProperty("instanceprop1", newValue);
        return true;
      }
      if (propertyName === "My other instance property") {
        instance.setRawFloatProperty("instanceprop2", parseFloat(newValue));
        return true;
      }

      return false;
    };
    dummyObject.getInitialInstanceProperties = function(
      content,
      instance,
      project,
      layout
    ) {
      var instanceProperties = new gd.MapStringPropertyDescriptor();

      instanceProperties.set(
        "My instance property",
        new gd.PropertyDescriptor(
          instance.getRawStringProperty("instanceprop1")
        )
      );
      instanceProperties.set(
        "My other instance property",
        new gd.PropertyDescriptor(
          instance.getRawFloatProperty("instanceprop2").toString()
        ).setType("number")
      );

      return instanceProperties;
    };

    extension.addObject(
      "DummyObject",
      t("Dummy object for testing"),
      t("This dummy object does nothing"),
      "CppPlatform/Extensions/topdownmovementicon.png",
      dummyObject
    );

    return extension;
  }
};
