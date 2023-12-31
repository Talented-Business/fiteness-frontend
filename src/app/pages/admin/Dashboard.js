import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { http } from "../home/services/api";
import CustomersChart from "./sections/CustomersChart.js";
import { $exportReport, $exportReportUsage } from "../../../modules/subscription/customer";

const useStyles = makeStyles(theme => ({
}));

const convertString = (today)=>{
  let month = today.getMonth()+1;
  if(month<10)month = '0'+month;
  let day = today.getDate();
  if(day<10)day = '0'+day;
  return today.getFullYear()+'-'+month+'-'+day;
}
export default function Dashboard() {
  const [from, setFrom] = useState(()=>{
    let today = new Date();
    today.setDate(1);
    return convertString(today);
  });
  const [to, setTo] = useState(convertString(new Date()));
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchReports();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const classes = useStyles();
  const fetchReports = async ()=>{
    const res = await http({
      path: `reports/customers?from=${from}&to=${to}`
    });
    if(res.data){
      console.log(res.data);
      setData(res.data);
    }
  }  
  const dispatch = useDispatch();
  const handleSearch = ()=>{
    if(from==="" || to==="" || from>to){
      alert("please choose valid dates");
      return;
    }
    fetchReports();
  }
  const handleExport = ()=>{
    dispatch($exportReport(from,to));
  }
  const handleExportUsage = ()=>{
    dispatch($exportReportUsage(from,to));
  }
  const changeFromDate = (event)=>{
    setFrom(event.target.value);
  }
  const changeToDate = (event)=>{
    setTo(event.target.value);
  }
  return <>
    <Paper className={classes.root}>
      <div className="pt-5 pb-5">
        <div className="text-center">
          <label htmlFor="from">From&nbsp;&nbsp;</label>
          <input name="from" type="date" value={from} onChange={changeFromDate}/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="to">To&nbsp;&nbsp;</label>
          <input name="to" type="date" value={to} onChange={changeToDate}/>
          <button className="btn btn-primary" onClick={handleSearch}>Filter</button>
          <button className="btn btn-primary" onClick={handleExport}>Export</button>
          <button className="btn btn-primary" onClick={handleExportUsage}>Export Usage</button>
        </div>
      </div>
      {data&&
        <CustomersChart data={data} color={"green"}/>
      }
    </Paper>
  </>;
}
export function SubHeaderDashboard() {
  return <h1>Dashboard</h1>;
}
