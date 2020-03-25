import React, { Component } from 'react';

import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import { Cascader , Input, Button ,Table,Switch  } from 'antd';
import { parse } from 'mathjs';
import axios from 'axios';



import { Layout, Menu } from 'antd';  
import { UserOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class OnePoint extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            options:[],
            Eq:null,
            xinitial:null,
            result:null,
            dataTable:[]
        }
    }

    componentDidMount()
    {
        // axios.get('http://localhost:8080/show_OnePoint.php')//Docker//
        axios.get('http://localhost/numer/server/showOnePoint.php')
        .then(res=>{
            console.log(res.data);
            let item =[];
            let optionsArr = [];
            res.data.map(dataMap=>{
                let optionsObj = {};
                if(dataMap.N_Type==="OnePoint")
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
    }

    Equet = (EqForSloveFuntion,xvalueforSlove) => {

      const NodeEqua = parse(EqForSloveFuntion);
      const Equa = NodeEqua.compile();
      let scope = {
          x:xvalueforSlove
      }
      return Equa.eval(scope);

  }

  err = (xiw1, xi) => {
      var er = ((Math.abs((xiw1 - xi) / xiw1))*100)/100;
      return er;
  }

  getValue = () => {

      const {Eq,xinitial} = this.state;
      var xiinmain = parseFloat(xinitial);
      let tableArrData = [];
      console.log(Eq,xiinmain);
      var i=0;
      var xiw1inmain;
      var fixerrorValue = 0.00001;
      var errorValue=1;

      while(errorValue >= fixerrorValue)
      {
        xiw1inmain = this.Equet(Eq,xiinmain);
        errorValue= this.err(xiw1inmain,xiinmain);

        let tableObjData = {};
        tableObjData.index = i;
        tableObjData.xiinmain = xiinmain;
        tableObjData.xiw1inmain = xiw1inmain;
        tableObjData.errorValue = errorValue;
        tableArrData.push(tableObjData);
        console.log("XMVALUE = ", xiw1inmain);
        console.log("I value =", i);
        console.log("This is errorvalue = ", errorValue);
        console.log("This is fixvalueerror = ", fixerrorValue);
        xiinmain=xiw1inmain;
        i++;
      }
      this.setState({
        dataTable:tableArrData,
        result:xiw1inmain
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
        title: 'Xinitial',
        dataIndex: 'xiinmain',
        key: 'xiinmain',
      },
      {
        title: 'XValue',
        dataIndex: 'xiw1inmain',
        key: 'xiw1inmain',
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
        <h5>This is Result of One-Point Iteration : {this.state.result}</h5><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
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
            <h1 className="num"><Link to="/Head"/>Numerical</h1>
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
            <h1>One-Point Itertion</h1>
            <h5>Select Function</h5>
            <h5>Open Input Manual : <Switch onChange={this.onChangeSwitch} style={{margin:"1%"}}/></h5>
            <di>
              {this.showInput()}
            </di>
          </p>
          <p>
            <span>Input Initial</span>
            <Input placeholder="Input Initial" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%"}} onChange={e=>this.setState({xinitial:e.target.value})}/>
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
export default OnePoint;