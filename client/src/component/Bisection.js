import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import { Cascader , Input, Button ,Table,Switch } from 'antd';
import { parse } from 'mathjs';
import axios from 'axios';



import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class Bisection extends Component{
  
  constructor(props)
  {
      super(props);
      this.state={
          options:[],
          Eq:null,
          xrValue:null,
          xlValue:null,
          result:null,
          dataTable:[]
      }
  }

  componentDidMount()
  {
      // axios.get('http://localhost:8080/show_Bisection.php')//Docker//
      axios.get('http://localhost/numer/server/showBisection.php')
      .then(res=>{
          console.log(res.data);
          let item =[];

          // สมาก่าร
          let optionsArr = [];

          res.data.map(dataMap=>{
              let optionsObj = {};
              if(dataMap.N_Type === "Bisection")
              {
                  item = item.concat(dataMap.N_Name);
                  optionsObj.value = dataMap.N_Name;
                  optionsObj.label = dataMap.N_Name;
                  optionsArr.push(optionsObj);
                  console.log(optionsObj);
              }

          })
          this.setState({
              options:optionsArr
          })
      })
      .catch(err=>{
        throw err;
      })
  }

  Equet = (EqForSloveFuntion,xvalueforSlove)=>{
    const NodeEqua = parse(EqForSloveFuntion);
    const Equa = NodeEqua.compile();
    let scope = {
      x:xvalueforSlove
    }
    return Equa.eval(scope);
  }

  err = (xmold, xmnew)=>{
    var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
    return er;
  }

  getValue = ()=>{

    const {Eq,xlValue,xrValue} = this.state;
    var xl = parseFloat(xlValue);
    var xr = parseFloat(xrValue);
    let tableArrData = [];
    console.log(Eq,xl,xr);
    var xm = ( xl + xr ) / 2;
    console.log(this.state);
    var xmArr = new Array();
    var fxmArr = new Array();
    var xmoldinmain = xm;
    xmArr[0] = xm;
    var fxl;
    var fxr;
    var fxm;
    var i = 0;
    var fixvalueerror = 0.00001;
    var errorvalue = 1;
    while (errorvalue >= fixvalueerror) {
       fxl = this.Equet(Eq,xl);
       fxr = this.Equet(Eq,xr);
        if (i != 0) {
            xm = (xl + xr) / 2;
       } 
        fxm = this.Equet(Eq,xm);
        if ((fxm * fxl) > 0) {
          xl=xm
        }
        else {
            xr=xm
        }
        if (i != 0) {
            errorvalue = this.err(xmoldinmain, xm);
            xmoldinmain = xm;
            console.log("If Work");
        }
        let tableObjData = {};
        tableObjData.index = i;
        tableObjData.xl = xl;
        tableObjData.xr = xr;
        tableObjData.xm = xm;
        tableObjData.errorvalue = errorvalue;
        tableArrData.push(tableObjData);
        console.log("XMVALUE = ", xm);
        console.log("I value =", i);
        console.log("This is errorvalue = ", errorvalue);
        console.log("This is fixvalueerror = ", fixvalueerror);
        xmArr[i] = xm;
        fxmArr[i] = fxm;
        i++;
    }
    this.setState({
      dataTable:tableArrData,
      result:xm
    })
  }

showResult=()=>{
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'XL',
      dataIndex: 'xl',
      key: 'xl',
    },
    {
      title: 'XR',
      dataIndex: 'xr',
      key: 'xr',
    },
    {
      title: 'XM',
      dataIndex: 'xm',
      key: 'xm',
    },
    {
      title: 'Error',
      dataIndex: 'errorvalue',
      key: 'errorvalue',
    },
  ];

  if(this.state.result!==null)
  {
    return <div>
      <h5>This is Result of Bisection : {this.state.result}</h5><br/>
      <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:80 , marginRight:80 , background:"lightblue" }}/>
    </div>

  }
}









onChange = (value) => {
  console.log(value[0]);
  this.setState({
    Eq:value[0]
  })
}

// Just show the latest item.
displayRender = (label) => {
  return label[label.length - 1];
}



onChangeSwitch = (checked) => {
  console.log(checked)
  this.setState({
    SwitchOpen:checked
  })
}

showInput = () =>{
  if(this.state.SwitchOpen){
    return <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
  }
  else{
    return <Cascader
    options={this.state.options}
    expandTrigger="hover"
    displayRender={this.displayRender}
    onChange={this.onChange}
    style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
    />
  }
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
            <h1>Bisection</h1>
            <h5>Select Function</h5>
            <h5>Open Input Manual : <Switch onChange={this.onChangeSwitch} style={{margin:"1%"}}/></h5>
            <di>
              {this.showInput()}
            </di>
            {/* <Cascader
              options={this.state.options}
              expandTrigger="hover"
              displayRender={this.displayRender}
              onChange={this.onChange}
            /> */}
          </p>
            <p>
            <span>Input XL</span>
            <Input placeholder="Input XL" style={{width:250 , marginLeft:10 , marginRight:50 , marginBottom:10}} onChange={e=>this.setState({xlValue:e.target.value})}/>
            <br/>
            <span>Input XR</span>
            <Input placeholder="Input XR" style={{width:250 , marginLeft:10 , marginRight:50 , marginTop:10}} onChange={e=>this.setState({xrValue:e.target.value})}/>
          </p>
          <p>
            <Button onClick={this.getValue}>Submit</Button>
          </p>
          {this.showResult()}
           

         
        </Content>
      </Layout>
    </Layout>
  </Layout> 
  </div> 
          
          
                  
        );
    }
}
export default Bisection;