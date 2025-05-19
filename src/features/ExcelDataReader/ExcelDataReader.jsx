import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './excelDataReader.css'
import Table from '../Table';

function ExcelDataReader() {
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [fileData, setFileData] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileData(file);
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const arrayBuffer = reader.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                if (jsonData && jsonData.length > 0) {
                    const header = jsonData[0];
                    setHeader(header);
                    const formattedData = jsonData.slice(1).map((row) => {
                        const obj = {};
                        header.forEach((key, index) => {
                            obj[key] = row[index];
                        });
                        return obj;
                    });
                    setData(formattedData); 
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            // Read file as array buffer
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className=' container-fluid excel_reader'>
            <div className="upload_excel">
                <span>Upload</span>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            </div>

            {
                fileData?.name ? (
                    <>
                        <h2 className="fileName">{fileData?.name}</h2>
                    </>
                ) : (
                    <h2 className='file_warning '>
                        Pls upload the file ...
                        <span>accepted formats xlsx, xls</span>
                    </h2>
                )
            }

            {fileData && header && data && <Table header={header} data={data} />}

        </div>
    );
}

export default ExcelDataReader;
