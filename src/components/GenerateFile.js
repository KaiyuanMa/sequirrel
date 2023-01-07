import React from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useSelector } from "react-redux";
import { useReactFlow } from "reactflow";

function GenerateFile() {
  const { dataSet } = useSelector((state) => state.dataSet);
  const { models } = useSelector((state) => state.models);
  const reactFlowInstance = useReactFlow();

  const generateRelationship = (edge, nodes) => {
    let sourceModelName = null;
    let targetModelName = null;
    let relationship = edge.label;
    for (let i = 0; i < nodes.length; i++) {
      if (sourceModelName && targetModelName) break;
      if (edge.source == nodes[i].id) {
        sourceModelName = models.find(
          (model) => model.id == nodes[i].data.modelId
        ).name;
      } else if (edge.target == nodes[i].id) {
        targetModelName = models.find(
          (model) => model.id == nodes[i].data.modelId
        ).name;
      }
    }
    return `${sourceModelName}.${relationship}(${targetModelName})\n`;
  };

  const generateModelBlob = (model) => {
    let blobArray = [
      "const conn = require('./conn');\n",
      "const { Sequelize } = conn;\n\n",
      `const ${model.name} = conn.define('${model.name.toLowerCase()}', {\n`,
    ];
    for (let entry of model.entries) {
      const entryBlobArray = [];
      entryBlobArray.push(` ${entry.name}: {\n`);
      entryBlobArray.push(`  type: ${entry.type},\n`);
      if (entry.primaryKey) {
        entryBlobArray.push(`  primaryKey: true,\n`);
        if (entry.autoIncrement)
          entryBlobArray.push(`  autoIncrement: ${entry.autoIncrement},\n`);
        if (entry.defaultValue)
          entryBlobArray.push(`  defaultValue: ${entry.defaultValue},\n`);
      } else {
        if (entry.allowNull !== null)
          entryBlobArray.push(`  allowNull: ${entry.allowNull},\n`);
        if (entry.unique) entryBlobArray.push(`  unique: ${entry.unique},\n`);
        if (entry.defaultValue)
          entryBlobArray.push(`  defaultValue: ${entry.defaultValue},\n`);
        if (entry.validations.length > 0) {
          entryBlobArray.push(`  validate: {\n`);
          for (let validation of entry.validations) {
            entryBlobArray.push(
              `   ${validation.name}: ${validation.parameter},\n`
            );
          }
          entryBlobArray.push(`  },\n`);
        }
      }
      entryBlobArray.push(` },\n`);
      blobArray = [...blobArray, ...entryBlobArray];
    }
    blobArray.push("});\n\n");
    blobArray.push(`model.exports = ${model.name};`);
    return blobArray;
  };

  const generateAndDownload = () => {
    const zip = new JSZip();
    const dbFolder = zip.folder("db");
    const edges = reactFlowInstance.getEdges();
    const nodes = reactFlowInstance.getNodes();

    const modelNames = [];
    const modelBlobs = [];

    for (let model of models) {
      dbFolder.file(`${model.name}.js`, new Blob(generateModelBlob(model)));
      modelNames.push(model.name);
    }

    const indexImportArray = [];
    indexImportArray.push("const conn = require('./conn')\n");

    const indexExportArray = [];
    indexExportArray.push("module.exports = {\n");
    indexExportArray.push(" conn,\n");
    for (let ModelName of modelNames) {
      indexImportArray.push(`const ${ModelName} = require('./${ModelName}')\n`);
      indexExportArray.push(` ${ModelName},\n`);
    }
    indexExportArray.push("};");

    const indexRelationshipArray = [];
    for (let edge of edges) {
      indexRelationshipArray.push(generateRelationship(edge, nodes));
    }

    const indexBlobArray = [
      ...indexImportArray,
      "\n",
      ...indexRelationshipArray,
      "\n",
      ...indexExportArray,
    ];

    dbFolder.file("index.js", new Blob(indexBlobArray));

    dbFolder.file(
      "conn.js",
      new Blob([
        "const Sequelize = require('sequelize');\n\n",
        "const conn = new Sequelize(\n",
        ` process.env.DATABASE_URL || 'postgres://localhost/${dataSet.name}'\n`,
        ");\n\n",
        "module.exports = conn;",
      ])
    );

    zip.generateAsync({ type: "blob" }).then(
      function (blob) {
        FileSaver.saveAs(blob, `${dataSet.name}.zip`);
      },
      function (err) {
        jQuery("#blob").text(err);
      }
    );
  };
  return (
    <div>
      <button className="map-tool-btn" onClick={generateAndDownload}>
        Generate File
      </button>
    </div>
  );
}

export default GenerateFile;
