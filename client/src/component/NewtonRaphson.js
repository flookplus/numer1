import React, { Component } from 'react';

import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import { Cascader , Input , Button , Table ,Switch } from 'antd'; 
import { parse } from 'mathjs';
import axios from 'axios';

// /Switch / 


import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class NewtonRaphson extends Component{
  
    constructor(props)
    {
        super(props);
        this.state={
            options:[],
            diffs:[],
            Eq:null,
            EqDiff:null,
            Xinitial:null,
            result:null,
            dataTable:[]
        }
    }
    componentDidMount()
    {
        // axios.get('http://localhost:8080/show_NewtonRaphson.php')//Docker//
        axios.get('http://localhost/numer/server/showNewtonRaphson.php')
        .then(res=>{
            console.log(res.data);
            let item =[];
            let optionsArr = [];
            let optionsDiffArr = [];
            res.data.map(dataMap=>{
              let optionsObj = {};
              let optionsDiff = {};
                if(dataMap.N_Type=="NewtonRaphson")
                {
                    item = item.concat(dataMap.N_Name);
                    optionsObj.value = dataMap.N_Name;
                    optionsObj.label = dataMap.N_Name;
                    optionsDiff.value = dataMap.N_Diff;
                    optionsDiff.label = dataMap.N_Diff;
                    optionsArr.push(optionsObj);
                    optionsDiffArr.push(optionsDiff);
                    console.log(optionsObj);
                    console.log(optionsDiff);
                }
            })
            this.setState({
                options:optionsArr,
                diffs:optionsDiffArr
            })
        })
    }

    Equet = (EqForSloveFuntion,xvalueforSlove) => {
        const NodeEqua = parse(EqForSloveFuntion);
        const Equa = NodeEqua.compile();
        let scope = {
            x:xvalueforSlove
        }
        return Equa.eval(scope);
  
    }
  
    err = (xmold, xmnew) => {
        var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
        return er;
    }
    getValue = () => {

        const {Eq,EqDiff,Xinitial} = this.state;
        console.log(Xinitial);
        var xi_inmain  = parseFloat(Xinitial);
        let tableArrData = [];
  
        var xiplus1_inmain;
        var fxi;
        var fxpi;
        var fixerrorValue = 0.0001;
        var errorValue = 1;
        var i=0;
  
    while(errorValue>=fixerrorValue)
    {
        fxi=this.Equet(Eq,xi_inmain);
        fxpi=this.Equet(EqDiff,xi_inmain);
        xiplus1_inmain=xi_inmain-(fxi/fxpi);
        errorValue = this.err(xiplus1_inmain,xi_inmain);
  
        let tableObjData = {};
        tableObjData.index = i;
        tableObjData.xi_inmain = xi_inmain;
        tableObjData.errorValue = errorValue;
        tableArrData.push(tableObjData);
        console.log(xi_inmain,fxi,fxpi);
        console.log("XMVALUE = ", xiplus1_inmain);
        console.log("This is errorvalue = ", errorValue);
        console.log("This is fixvalueerror = ", fixerrorValue);
        xi_inmain=xiplus1_inmain;
        i++;
        }
        this.setState({
          dataTable:tableArrData,
          result:xiplus1_inmain
        })
    }

    // EquationNewton = () =>{
    //     const formData = new FormData();
      
    //     formData.append("N_Name",this.state.Eq);
    //     formData.append("N_Type","NewtonRaphson");
    //     formData.append("N_Diff",this.state.EqDiff);
    //     const config = {
    //       headers: {
    //           "content-type": "multipart/form-data"
    //           }
    //       };
    //       // axios.post('http://localhost:8080/add_equation.php',formData,config)
         
    //     axios.post('http://localhost/numer/server/add_equation.php',formData,config)
    //     .then(res=>{
    //       console.log(res);
    //     })
    //     .catch(err=>{
    //        throw err
    //     })
    //   }
    
      showResult=()=>{
        const columns = [
          {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
          },
          {
            title: 'X',
            dataIndex: 'xi_inmain',
            key: 'xi_inmain',
          },
          {
            title: 'Error',
            dataIndex: 'errorValue',
            key: 'errorValue',
          },
        ];
        if(this.state.result!==null)
        {
          return <div>
            <h5>This is Result of NewtonRaphson is : {this.state.result}</h5><br/>
            <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
          </div>
    
        }
      }
    
        onChange = (value) => {// Function
          console.log(value[0]);
          this.setState({
            Eq:value[0]
          })
        }
        displayRender = (label) => {
          return label[label.length - 1];
        }
    
        onChange2 = (value) => {//Funtion Diff
          console.log(value[0]);
          this.setState({
            EqDiff:value[0]
          })
        }
        displayRender2 = (label) => {
          return label[label.length - 1];
        }
    
        // onChangeSwitch1 = (checked) => {
        //   console.log(checked)
        //   this.setState({
        //     SwitchOpen:checked
        //   })
        // }
    
        // onChangeSwitch = (checked) => {
        //   console.log(checked)
        //   this.setState({
        //     SwitchOpen:checked
        //   })
        // }
    
        showInput = () =>{
          if(this.state.SwitchOpen){
            return <div>
            <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
            <Button onClick={this.EquationNewton} style={{marginBottom:"0.5%", backgroundColor:"lightblue"}}>Add Equation</Button>
          </div>
          }
          else{
            return <p><Cascader
            options={this.state.options}
            expandTrigger="hover"
            displayRender={this.displayRender}
            onChange={this.onChange}
            style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
            /></p>
          }
        }
    
        showInput2 = () =>{
          if(this.state.SwitchOpen){
            return <div>
            <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({EqDiff:e.target.value})}/>
            <Button onClick={this.EquationNewton} style={{marginBottom:"0.5%", backgroundColor:"lightblue"}}>Add Equation</Button>
          </div>
          }
          else{
            return <p><Cascader
            options={this.state.diffs}
            expandTrigger="hover"
            displayRender={this.displayRender2}
            onChange={this.onChange2}
            style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
            /></p>
          }
        }
// Just show the latest item.
displayRender = (label) => {
  return label[label.length - 1];
}
 
    render(){
        return(
          <div>
          <Layout>
    <Header className="header">
            <h1 className="num">Numerical</h1>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="1"><Link to="/Bisection"/>Bisection</Menu.Item>
            <Menu.Item key="2"><Link to="/FalsePosition"/>FalsePosition</Menu.Item>
            <Menu.Item key="3"><Link to="/OnePoint"/>One-Point lntertion</Menu.Item>
            <Menu.Item key="4"><Link to="/NewtonRaphson"/>NewtonRaphson</Menu.Item>
            <Menu.Item key="5"><Link to="/Secant"/>Secant</Menu.Item>
          </SubMenu>
        
          
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 600,
          }}
        >
          {/* ใส่ตรงกลาง       */}
          <br/>
          <p>
            <h1>Newton Raphson</h1>
            <h5>Select Function</h5>
            <h5>Open Input Manual : <Switch onChange={this.onChangeSwitch} style={{margin:"1%"}}/></h5>
            <di>
              {this.showInput()}
            </di>
            <h5 style={{marginTop:"2%"}}>Select Function Diff</h5>
            <di>
              {this.showInput2()}
            </di>
          </p>
          <p>
            <span>Input Xinitial</span>
            <Input placeholder="Input Xinitial" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Xinitial:e.target.value})} />
            <br/>
          </p>
          <p>
            <Button onClick={this.getValue}>Submit</Button>
          </p>
          <br/>
          {this.showResult()}
          
          
           

         
        </Content>
      </Layout>
    </Layout>
  </Layout> 
  </div> 
          
          
                  
        );
    }
}
export default NewtonRaphson;