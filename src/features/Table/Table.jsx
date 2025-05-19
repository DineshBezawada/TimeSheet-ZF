import { useEffect, useState } from "react";
import "./table.css";
import InputOptions from "../InputOptions";

const Table = ({ header, data }) => {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [projectIds, setProjectIds] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [meetingProjects, setMeetingProjects] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [freeTexts, setFreeTexts] = useState([]);

  console.log(data, "excelData");

  const [rows, setRows] = useState([
    {
      order: "",
      category: "",
      activity: "",
      projectId: "",
      description: "",
      projectName: "",
      freeText: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        order: "",
        category: "",
        activity: "",
        projectId: "",
        description: "",
        projectName: "",
        freeText: "",
      },
    ]);
  };

  useEffect(() => {
    if (data?.[0]) {
      const keys = Object.keys(data[0]);

      const extractUniqueValues = (key) => {
        return [
          ...new Set(
            data
              .map((record) => record[key])
              .filter(
                (value) =>
                  value !== null &&
                  value !== "" &&
                  value !== undefined &&
                  value?.length > 0
              )
          ),
        ];
      };
      setCategories(extractUniqueValues(keys[1]));
      setActivities(extractUniqueValues(keys[2]));
      setProjectIds(extractUniqueValues(keys[3]));
      setDescriptions(extractUniqueValues(keys[4]));
      setProjectNames(extractUniqueValues(keys[5]));
      setFreeTexts(extractUniqueValues(keys[6]));
    }
  }, [data]);

  const handleUpdateRowData = (rowIndex, type, option, isMeeting) => {
    let rowData = [...rows];
    const excelData = JSON.parse(JSON.stringify(data));
    rowData[rowIndex][type] = option;

    // Auto-fill the other fields when projectId, description, projectName, or freeText is selected
    // if (type === "projectId" && !isMeeting) {
    //   const excelDataObj = excelData?.find((obj) => obj.projectId === option);
    //   if (excelDataObj?.projectName?.length > 0) {
    //     rowData[rowIndex]["description"] = excelDataObj?.description;
    //     rowData[rowIndex]["projectName"] = excelDataObj?.projectName;
    //     rowData[rowIndex]["freeText"] = excelDataObj.freeText;
    //   }
    // } else if (type === "projectName" && !isMeeting) {
    //   const excelDataObj = excelData?.find((obj) => obj.projectName === option);
    //   if (excelDataObj?.projectId?.length > 0) {
    //     rowData[rowIndex]["description"] = excelDataObj?.description;
    //     rowData[rowIndex]["projectId"] = excelDataObj?.projectId;
    //     rowData[rowIndex]["freeText"] = excelDataObj.freeText;
    //   }
    // } else if (type === "description" && !isMeeting) {
    //   const excelDataObj = excelData?.find((obj) => obj.description === option);
    //   if (excelDataObj?.projectId?.length > 0) {
    //     rowData[rowIndex]["projectId"] = excelDataObj?.projectId;
    //     rowData[rowIndex]["projectName"] = excelDataObj?.projectName;
    //     rowData[rowIndex]["freeText"] = excelDataObj.freeText;
    //   }
    // } else if (type === "freeText" && !isMeeting) {
    //   const excelDataObj = excelData?.find((obj) => obj.freeText === option);
    //   if (excelDataObj?.projectId?.length > 0) {
    //     rowData[rowIndex]["projectId"] = excelDataObj?.projectId;
    //     rowData[rowIndex]["projectName"] = excelDataObj?.projectName;
    //     rowData[rowIndex]["description"] = excelDataObj.description;
    //   }
    // }

    // Handle activity-specific logic (meeting or organization)
    if (option === "Organization") {
      rowData[rowIndex]["activity"] = "";
      rowData[rowIndex]["projectId"] = "";
      rowData[rowIndex]["description"] = "";
      rowData[rowIndex]["projectName"] = "";
      rowData[rowIndex]["freeText"] = "";
    }

    if (option === "meeting") {
      // if (meetingProjects?.includes(rowData[rowIndex]["projectId"])) {
      //   rowData[rowIndex]["projectId"] = rowData[rowIndex]["projectId"];
      // } else {
      rowData[rowIndex]["projectId"] = "";
      // }
      rowData[rowIndex]["description"] = "";
      rowData[rowIndex]["projectName"] = "";
      rowData[rowIndex]["freeText"] = "";
    }

    setRows(rowData);
  };


  useEffect(() => {
    console.log(rows,"rows");
    const meetingProj = rows
      ?.map((record) => {
        if (
          record.activity === "task" &&
          record?.projectId?.toString()?.length > 0
        ) {
          return record.projectId;
        }
      });
    setMeetingProjects([...new Set(meetingProj)]);
  }, [rows]);
console.log(projectIds,"projectIds");

  // const filteredOptions = (
  //   projectId,
  //   description,
  //   projectName,
  //   freeText,
  //   type
  // ) => {
  //   const excelData = JSON.parse(JSON.stringify(data));
  //   const filteredData = excelData.filter((item) => {
  //     if (projectId && item.projectId !== projectId) return false;
  //     if (description && item.description !== description) return false;
  //     if (projectName && item.projectName !== projectName) return false;
  //     if (freeText && item.freeText !== freeText) return false;
  //     return true;
  //   });
  //   return [
  //     ...new Set(
  //       filteredData
  //         .map((item) => item[type])
  //         .filter(
  //           (value) => value !== null && value !== "" && value !== undefined
  //         )
  //     ),
  //   ];
  // };

  return (
    <>
      <div className="table_main">
        <table className="table table-responsive">
          <thead>
            <tr>
              {header?.map((col, idx) => (
                <th key={idx}>{col === "order" ? "s.no" : `${col}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <div className="p-2 ">{rowIndex + 1}</div>
                </td>
                <td>
                  <InputOptions
                    rowIndex={rowIndex}
                    type="category"
                    selectedOption={row?.category}
                    options={categories}
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
                <td>
                  <InputOptions
                    disabled={row?.category === "Organization"}
                    rowIndex={rowIndex}
                    type="activity"
                    selectedOption={row?.activity}
                    options={[...new Set([...activities, "meeting"])]}
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
                <td>
                  <InputOptions
                    isMeeting={
                      row?.activity === "meeting" ||
                      row?.category === "Organization"
                    }
                    disabled={
                      row?.category === "Organization" ||
                      (row?.activity === "meeting" &&
                        meetingProjects?.length === 0)
                    }
                    rowIndex={rowIndex}
                    type="projectId"
                    selectedOption={row?.projectId}
                    options={
                      (row?.category === "Organization" ||
                      row?.activity === "meeting")
                        ? meetingProjects
                        : projectIds
                    }
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
                <td>
                  <InputOptions
                    disabled={
                      row?.category === "Organization" ||
                      row?.activity === "meeting"
                    }
                    rowIndex={rowIndex}
                    type="description"
                    selectedOption={row?.description}
                    options={descriptions}
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
                <td>
                  <InputOptions
                    disabled={
                      row?.category === "Organization" ||
                      row?.activity === "meeting"
                    }
                    rowIndex={rowIndex}
                    type="projectName"
                    selectedOption={row?.projectName}
                    options={projectNames}
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
                <td>
                  <InputOptions
                    rowIndex={rowIndex}
                    type="freeText"
                    selectedOption={row?.freeText}
                    options={
                      row?.category === "Organization" ||
                      row?.activity === "meeting"
                        ? []
                        : freeTexts
                    }
                    handleUpdateRowData={handleUpdateRowData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 z-0">
        <button onClick={addRow} className="btn btn-primary">
          Add Row
        </button>
      </div>
    </>
  );
};
export default Table;
