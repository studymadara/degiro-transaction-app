const addTableRow = (headers, result,uniqueKey) => {
    return (
      <tr key={result[uniqueKey]}>
        {headers.map((h) => {
          return (<td>{result[h]}</td>)
        })}
      </tr>)
}

const createTable = (results,uniqueKey) => {

    let headers = fetchTableHeaders(results);

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((h) => {
              return (<th scope="col" key={makeHeaderStr(h)}>{makeHeaderStr(h)}</th>)
            })}
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            return addTableRow(headers, result,uniqueKey)
          })}
        </tbody>
      </table>
    )
  }

const fetchTableHeaders = (results) => {
    let headers = [];
    results.forEach((result) => 
    {
        Object.keys(result).forEach((r) => 
        {
            if(headers.indexOf(r)==-1) headers.push(r);
        });
    });
    return headers;
}

const makeHeaderStr = (header_str) => {
    if(typeof header_str !== 'string') return header_str
    return (header_str.charAt(0).toUpperCase() + header_str.slice(1)).replace('_', ' ')
}


const TableComponent = ({results,uniqueKey}) => {
    return (
        <div>
          {results.length ? (
            <div className="card">
              {createTable(results,uniqueKey)}
            </div>
          ) : null}
        </div>
      )
}
 
export default TableComponent;