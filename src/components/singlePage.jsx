import React, { Component } from 'react';
import { getPortfolioDetails, getTransactionDetails, submitTransactionDetails, updateTransactionDetails } from '../service/degiroServices';
import TableComponent from './tableComponent';
import Datetime from 'react-datetime';
import { formatDateTime } from '../util/commonUtil';

class SinglePage extends Component {
    state = { 
        transactionDetails:[],
        portFolioDetails:[],
        createUserId:'',
        createPrice:'',
        txnUserId:'',
        txnFromDate:'',
        txnToDate:'',
        portFolioUserId:'',
        portFolioToDate:''
     } 
    
    componentDidMount()
    {
        this.getTxnData();
        this.getPortFolioData();
    }

    getPortFolioData()
    {
        let specificObject="";
        if(this.state.portFolioUserId!=undefined && this.state.portFolioUserId!=='')
            specificObject={'userId':this.state.portFolioUserId,'toDateTime':formatDateTime(this.state.portFolioToDate)};

        getPortfolioDetails(specificObject)
        .then(response=>response.json())
        .then(data=>data.map(d=>(
            {
                ...d,
                tillDate:formatDateTime(d.tillDate)   
            }
        )
        ))
        .then(data=>this.setState({portFolioDetails:data}));
    }

    getTxnData() 
    {
        let specificObject="";
        if(this.state.txnUserId!=undefined && this.state.txnUserId!=='')
            specificObject={'userId':this.state.txnUserId,'fromDateTime':formatDateTime(this.state.txnFromDate),'toDateTime':formatDateTime(this.state.txnToDate)};

        getTransactionDetails(specificObject)
        .then(response=>response.json())
        .then(data=>data.map( d => (
            {
                ...d,
                txnDateTime:formatDateTime(d.txnDateTime), 
                action:<button className="btn btn-danger" onClick={()=>this.cancelTransactionService(d)} >Delete</button>
            }
            ))) 
        .then(data=>this.setState({transactionDetails:data}));
    }

    cancelTransactionService = ({transactionId}) =>
    {
        updateTransactionDetails(transactionId)
        // .then(response=>response.json()) 
        .then(()=>{
                    this.getTxnData()
                    this.getPortFolioData()
                    });
    }

    saveTransactionService = (userId,price) =>
    {
        submitTransactionDetails(userId,price)
        .then(()=>{
            this.getTxnData()
            this.getPortFolioData()
            });
    }

    resetTxnData = () =>
    {
        this.setState({txnUserId:'',txnFromDate:'',txnToDate:''});
        this.getTxnData();
    }

    render() 
    {
        return (<>
         <div className="bd-cheatsheet container-fluid bg-body">
            <section id="content">
            
            <div className="card">
                <div className="card-body">
                    <article className="my-3" id="floating-labels">
                        <div>
                            <div className='d-flex justify-content-between'>
                                <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                                <h5>Search Transactions</h5>
                                </div>
                            </div>
                            <div className="bd-example">
                            <div className='row g-3'>
                                <div className="form col-md-3">
                                    <span htmlFor="floatingUserId">User Id</span>
                                    <input type="text" value={this.state.txnUserId} onChange={event=>this.setState({txnUserId:event.target.value})}  className="form-control" id="floatingUserId" placeholder="1234"/>
                                </div>
                                <div className="form-floating col-md-3">
                                    <span>From Date</span>
                                    <Datetime value={this.state.txnFromDate} onChange={event=>this.setState({txnFromDate:event})} id='floatingFromDate'></Datetime>
                                </div>
                                <div className="form-floating col-md-3">
                                    <span>To Date</span>
                                    <Datetime value={this.state.txnToDate} onChange={event=>this.setState({txnToDate:event})} id='floatingToDate'></Datetime>
                                </div>
                                <div className="form-floating col-md-1">
                                <button className="btn btn-primary mt-4" onClick={()=>this.getTxnData()}>Search</button>
                                </div>
                                <div className="form-floating col-md-1">
                                <button className="btn btn-primary mt-4" onClick={()=>this.resetTxnData()}>Reset</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </article>

                    <article className="my-3" id="tables">
                        <div className='d-flex justify-content-between'>
                            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                            <h5>List of Transactions</h5>
                            </div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Transaction
                            </button>
                        </div>
                        <div>
                        <div className='bd-example'>
                            <TableComponent results={this.state.transactionDetails} uniqueKey='transactionId'></TableComponent>
                        </div>                
                        </div>
                    </article>
                </div>
            </div>
           
            <div className="card" style={{marginTop:'4%'}}>
                <div className="card-body">
                
                <article className="my-3" id="floating-labels">
                        <div>
                            <div className='d-flex justify-content-between'>
                                <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                                <h5>Search PortFolios</h5>
                                </div>
                            </div>
                            <div className="bd-example">
                            <div className='row g-3'>
                                <div className="form col-md-3">
                                    <span htmlFor="floatingUserId">User Id</span>
                                    <input type="text" value={this.state.portFolioUserId} onChange={event=>this.setState({portFolioUserId:event.target.value})}  className="form-control" id="floatingUserId" placeholder="1234"/>
                                </div>
                                <div className="form-floating col-md-3">
                                    <span>To Date</span>
                                    <Datetime value={this.state.portFolioToDate} onChange={event=>this.setState({portFolioToDate:event})} id='floatingPortFolioToDate'></Datetime>
                                </div>
                                <div className="form-floating col-md-3">
                                    <button className="btn btn-primary mt-4" onClick={()=>this.getPortFolioData()}>Search</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </article>
                
                <article className="my-3">
                    <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                        <h5>List of Portfolios</h5>
                        </div>
                        <div>
                        <div className='bd-example'>
                            <TableComponent results={this.state.portFolioDetails} uniqueKey='transactionId'></TableComponent>
                        </div>                
                    </div>
                </article>
                </div>
            </div>
              
              
            </section>
          </div>


          <div className="modal" tabindex="-1" id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Transaction</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>
                    <form className='row g-3'>
                        <div className="form col-md-3">
                            <span htmlFor="floatingModalUserId">User Id</span>
                            <input type="text" className="form-control" value={this.state.createUserId} onChange={event=>this.setState({createUserId:event.target.value})} id="floatingModalUserId" placeholder="1234"/>
                        </div>
                        <div className="form col-md-3">
                            <span htmlFor="floatingModalPriceId">Price</span>
                            <input type="text" className="form-control" value={this.state.createPrice} onChange={event=>this.setState({createPrice:event.target.value})} id="floatingModalPriceId" placeholder="12.34"/>
                        </div>
                    </form>
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>this.saveTransactionService(this.state.createUserId,this.state.createPrice)}>Save Transaction</button>
                </div>
                </div>
            </div>
        </div>

        </>);
    }
}
 
export default SinglePage;