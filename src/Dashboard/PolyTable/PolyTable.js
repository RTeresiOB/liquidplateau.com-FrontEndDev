import React from "react"
import Table from "./Table"
import styled from "styled-components"
export default function PolyTable(data=null, props){

    const Styles = styled.div`
            padding: 1rem;
            width: 100%;
            height: 200px;
            min-width: 700px;
            overflow-y: scroll;
            table {
                table-layout: fixed;
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                height: 300px;
                overflow: auto;

                tbody {
                    width: 700px;
                    display: block;
                    overflow: auto;
                    height: 300px;
                  }
                tr {
                    width: 700px;
                :last-child {
                    td {
                    border-bottom: 0;
                    }
                }
                }

                th,
                td {
                width: 350px;
                margin: 0;
                padding: 0.5rem;
                border-right: 1px solid black;

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