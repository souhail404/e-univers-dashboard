import React from 'react'
import { Skeleton } from "@mui/material"; 

const TableSkeleton = ({lines, rows}) => {
    const linesArr = Array.from(Array(lines).keys())  
    const rowsArr = Array.from(Array(rows).keys())  
    return (
        <>
        {
            linesArr.map((line)=>{
                return(
                    <tr key={line}>
                        {
                            rowsArr.map((row)=>{
                                return (<td key={row}><Skeleton animation='wave' /></td>)
                            })
                        }
                    </tr>
                )
            })
        }
        </>
    )
}

export default TableSkeleton