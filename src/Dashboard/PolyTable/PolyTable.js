import React from "react"
import Table from "./Table"
import styled from "styled-components"
import useWindowDimensions from "../useWindowDimensions"

function PolyTable(data=null, props){
    const { height, width } = useWindowDimensions();

    console.log(height, width)
    const Styles = styled.div`
            padding: 1rem;
            overflow-y: scroll;
            table {
                table-layout: fixed;
                border-collapse: collapse;
                border-spacing: 0;
                width: ${width/2}px;
                height: ${height/5}px;
                overflow-y: auto;
                overflow-x: hidden;

                tbody {
                    width: ${width/2}px;
                    display: block;
                    overflow: auto;
                    height: ${height/5}px;
                  }

                  thead{
                    width: ${width/2}px;
                    overflow: auto;
                  }
                tr {
                    width: ${width/2}px;
                :last-child {
                    td {
                    border-bottom: 0;
                    }
                }
                }

                th {
                
                width: ${width/4}px;
                margin: 0;
                padding: 0.5rem;
                border-right: 1px solid black;
                font-size: 1vw;
                border-right: 0;
              
                }
                
                
                td {
                width: ${width/4}px;
                margin: 0;
                padding: 0.5rem;
                border-right: 1px solid black;
                font-size: 1vw;

                :last-child {
                    border-right: 0;
                }
                }
            }
            `
    return(
        <Styles>
        <Table
        data={data.data}
        columns={[
          {
            Header: "Relative Political Ideology of Politicians",
            columns: [
              {
                Header: "Screen Name",
                accessor: "ScreenName"
              },
              {
                Header: "Ideology Score",
                id: "Ideology",
                accessor: d => Number(d.Ideology).toFixed(2)
              }
            ]
          }
        ]}
        
    />
    </Styles>
    )
}

const MemoizedPolyTable = React.memo(PolyTable);
export default MemoizedPolyTable;