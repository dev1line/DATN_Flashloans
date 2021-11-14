const { Text, Relationship, Checkbox } = require("@keystonejs/fields");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const { imageSet } = require("./ImageCloud");
const access = require("../access.control");

const orgImgAdapter = imageSet("Flashloans");

const Property = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    content: {
      type: Relationship,
      ref: "Property",
      many: true,
    },
    key: {
      type: Text,
      // isRequired: true,
    },
    value: {
      type: Text,
      // isRequired: true,
    },
    keyEN: {
      type: Text,
      label: "Key EN",
      // isRequired: true,
    },
    valueEN: {
      type: Text,
      label: "Value EN",
      // isRequired: true,
    },
    url: {
      type: Text,
    },
    flag: {
      type: Checkbox,
      isRequired: true,
      adminDoc: "This Field is defined style full column if you check its",
    },
    image: {
      type: CloudinaryImage,
      adapter: orgImgAdapter,
    },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  },
};

module.exports = Property;
