import * as React from 'react';
import Box from '@mui/material/Box';
import './AdminHome.css';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Chart from 'react-apexcharts';
import CardHeader from '@mui/material/CardHeader';
import {List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { FaCoins, FaUsers, FaUserCheck, FaBox } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';

const events = [
  { title: 'Weekly team meeting every Monday at 9am to discuss site performance, user feedback, and upcoming auction events', color: 'red' },
  { title: 'Monthly board meeting on the first Wednesday of every month at 2pm to report on site metrics, financial performance, and strategic planning', color: 'blue' },
  { title: 'Bi-weekly marketing meeting every other Friday at 10am to discuss promotional strategies and outreach efforts', color: 'gray' },
  { title: 'Daily reminder to check the sites customer support inbox for any user inquiries or issues that need to be addressed', color: 'red' },
  { title: 'Monthly reminder to conduct site backups and ensure all data is secure', color: 'blue' },
  { title: 'Quarterly reminder to review and update the sites terms and conditions, as well as privacy policy, to ensure compliance with relevant laws and regulations', color: 'gray' },
  { title: 'Bi-annual meeting with legal counsel to review any legal matters related to the sites operations', color: 'red' },
  { title: 'Bi-annual review of the sites SEO performance and optimization efforts', color: 'blue' },
  { title: 'Reminder to send out a user satisfaction survey after each auction event to gather feedback on the user experience', color: 'gray' },
  { title: 'Monthly review of the sites financial performance, including revenue, expenses, and profit margins', color: 'red' },
];


export default function AdminHome() {

  const [all_users, setUsers] = React.useState(0);
  const [income, setIncome] = React.useState(0);
  const [products, setProducts] = React.useState(0);
  const [active_users, setActive] = React.useState(0);
  const userID = reactLocalStorage.get('adminID');
  const [chartData, setChartData] = React.useState({
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#333',
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '10px',
          colors: ['#F44336', '#E91E63', '#9C27B0'],
        },
      },
      labels: ["Collectibles", 'Sporting', 'Electronics', 'Fashion', 'Toys','Music','Cars','Other'],
      legend: {
        position: 'bottom',
        offsetY: 0,
        height: 20,
        textWrap: true,
        markers: {
          offsetY: 0,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetY: 0,
            height: 300,
            markers: {
              offsetY: 0,
            },
          }
        }
      }],
    },
    series: [10, 10, 10, 10,10,10,10,30],
  });

  const [chartData2, setChartData2] = React.useState({
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#333',
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '10px',
          colors: ['#F44336', '#E91E63', '#9C27B0'],
        },
      },
      labels: ['Collectibles', 'Sporting', 'Electronics', 'Fashion', 'Toys','Music','Cars','Other'],
      legend: {
        position: 'bottom',
        offsetY: 0,
        height: 20,
        textWrap: true,
        markers: {
          offsetY: 0,
          fillColors: ['#FFC312','#C4E538','#12CBC4','#FDA7DF', '#ED4C67','#F79F1F', '#A3CB38','#1289A7']
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetY: 0,
            height: 300,
            markers: {
              offsetY: 0,
              fillColors: ['#FFC312','#C4E538','#12CBC4','#FDA7DF', '#ED4C67','#F79F1F', '#A3CB38','#1289A7']
            },
          }
        }
      }],
    },
    series: [15, 7, 24, 3,21,5,9,16],
  });
  

  React.useEffect(()=> {

    axios.post('https://pacific-sands-58031.herokuapp.com/admin/home', {adminID: userID, duration: "all time"}) //duration: all time, 7 days, 30 days, 3 months
    .then(function(res) {

      if (res.data.message === 'success'){
        setUsers(res.data.data.sales.NumberOfUsers)
        setIncome(res.data.data.sales.income)
        setProducts(res.data.data.sales.productsSold)
        setActive(res.data.data.sales.ActiveUsers)

        setChartData({
          options: {
            chart: {
              background: 'transparent',
              type: 'donut',
            },
            fill: {
              colors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600']
            },
            dataLabels: {
              enabled: false,
              style: {
                fontSize: '10px',
                colors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600'],
              },
            },
            labels: res.data.data.labels,
            legend: {
              position: 'bottom',
              offsetY: 0,
              height: 20,
              textWrap: true,
              markers: {
                offsetY: 0,
                fillColors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600']
              },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetY: 0,
                  height: 300,
                  markers: {
                    offsetY: 0,
                    fillColors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600']
                  },
                }
              }
            }],
          },
          series: res.data.data.itemsByCategory,
        })

        setChartData2({
          options: {
            chart: {
              background: 'transparent',
              foreColor: '#333',
              type: 'donut',
            },
            fill: {
              colors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600']
            },
            dataLabels: {
              enabled: false,
              style: {
                fontSize: '10px',
              },
            },
            labels: res.data.data.labels,
            legend: {
              position: 'bottom',
              offsetY: 0,
              height: 20,
              textWrap: true,
              markers: {
                offsetY: 0,
                fillColors: ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087','#f95d6a', '#ff7c43','#ffa600']
              },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetY: 0,
                  height: 300,
                  markers: {
                    offsetY: 0,
                  },
                }
              }
            }],
          },
          series: res.data.data.revenueByCategory,
        });

      }


           
    }, income)
    .catch(function(err) {
        console.log(err);
    })
  },[])

  function renderBulletIcon(color) {
    const styles = { color };
    return <FiberManualRecord style={styles} />;
  }
  

  return (
 

    <div className='container'>
        <div>
          <h2 style={{ textAlign: 'left' }}>Control Panel</h2>
        </div>
        
        <Card sx={{ width: '100%', marginTop:"20px" }}>
          <CardHeader sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', lineHeight: '2.5rem', height: '2.5rem', textAlign: 'left', fontSize: '100%', height: '100%' }} title="Performance Analytics"/>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Box sx={{ flexGrow: 1, width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h4 style={{marginBottom: '8px'}}>All Users</h4>
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <span style={{marginLeft: '5px', fontSize:"14px"}}><b>{all_users}</b></span>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40 }}>
                    <FaUsers size={24} color="white" />
                  </Avatar>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{marginBottom: '8px'}}>Active Users</h4>
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <span style={{marginLeft: '5px', fontSize:"14px"}}><b>{active_users}</b></span>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40 }}>
                    <FaUserCheck size={24} color="white" />
                  </Avatar>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{marginBottom: '8px'}}>Total Revenue</h4>
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <span style={{marginLeft: '5px', fontSize:"14px"}}><b>${income}</b></span>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40 }}>
                    <FaCoins size={24} color="white" />
                  </Avatar>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{marginBottom: '8px'}}>Total Items Sold</h4>
                <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <span style={{marginLeft: '5px', fontSize:"14px"}}><b>{products}</b></span>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40 }}>
                    <FaBox size={24} color="white" />
                  </Avatar>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{display:"flex", gap: 4, marginTop:"1.5%"}}>
        <Card sx={{ width: '49%', height:"40%" }}>
        <CardHeader sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', lineHeight: '2.5rem', height: '2.5rem', textAlign: 'left'}} title="Sales by Category"/>
          <CardContent>
          <Box sx={{ flexGrow: 1}}>
                <Chart options={chartData.options} series={chartData.series} type="donut" height="250" />
              </Box>
          
          </CardContent>
        </Card>
        <Card sx={{ width: '49%' }}>
          <CardHeader sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', lineHeight: '2.5rem', height: '2.5rem', textAlign: 'left'}} title="Timeline"/>
          <CardContent>
              <Box sx={{marginTop:"-2%"}}>
                <List >
                  {events.map((event) => (
                    <div>
                    <ListItem key={event.title} >
                      <ListItemIcon>{renderBulletIcon(event.color)}</ListItemIcon>
                      <ListItemText primary={event.title} primaryTypographyProps={{ style: { fontSize: '13px' } }}/>
                    </ListItem>
                    <Divider variant="middle" style={{ backgroundColor: 'black', height: '1px' }}/>
                    </div>
                    
                  ))}
                </List>
              </Box>
          </CardContent>
        </Card>
        </Box>
        <Box sx={{display:"flex", gap: 4, marginTop:"1%", marginBottom:"1%"}}>
        <Card sx={{ width: '49%', marginTop:"-29%", height:"80%" }}>
        <CardHeader sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', lineHeight: '2.5rem', height: '2.5rem', textAlign: 'left'}} title="Revenue by Category"/>
          <CardContent>
          <Box sx={{ flexGrow: 1}}>
                <Chart options={chartData2.options} series={chartData2.series} type="donut" height="250" />
              </Box>
          
          </CardContent>
        </Card>

        </Box>  
      </div> 
  );
}
