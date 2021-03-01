import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { applySheet } from "../../store/action/plotActions";
import xlsx from "xlsx";

import "./Dropzone.scss";

const Dropzone: FC = () => {
  /* list of supported file types */
  const fileTypes = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm",
  ]
    .map(function (x) {
      return "." + x;
    })
    .join(",");

  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const wb = xlsx.readFile(file.path);

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = xlsx.utils.sheet_to_json<string[] | number[]>(ws, {
        header: 1,
      });

      dispatch(applySheet(transformToColumnSets(data)));
    }
  }, []);

  const transformToColumnSets = (
    data: (string[] | number[])[],
    progressCallback?: (value: number) => void
  ): Record<string, Array<number | string>> => {
    const result: Record<string, Array<number | string>> = {};
    const columnNames = data[0] as string[];

    for (const column of columnNames) {
      result[column.trim()] = [];
    }

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (progressCallback) {
        progressCallback(i / data.length);
      }

      for (let j = 0; j < row.length; j++) {
        result[columnNames[j].trim()].push(row[j]);
      }
    }

    console.log(result);
    return result;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps({ className: "Dropzone" })}>
      <input {...getInputProps({ accept: fileTypes })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
