import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import BASE_URL from '../api';

// URL API của bạn

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BuyerProfilePieChart() {
  const [users, setUsers] = useState([]); // Lưu dữ liệu người dùng
  const [loading, setLoading] = useState(true); // Đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi nếu có


  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiUk9MRV9BRE1JTiIsImlzcyI6ImRldnRlcmlhLmNvbSIsImV4cCI6MTczNTg0ODk0NiwiaWF0IjoxNzM1ODQ1MzQ2LCJ1c2VySWQiOiI3MTQzMWYwMy0xMzYyLTRlZmMtOThjMS1jMDI0YjFhYjVkZTkiLCJqdGkiOiI4MmYzMzUyZi0zMjI1LTRlNDgtOTE2Yy05ZDdlMTg0ODA4ZTYifQ.b339uRdV5c-6MI_osBxeyfAnBU4dxJ-1e2WWcXeGWTY7khULCDMUNuz96oFjEPci8vPFsaiNfP_yXfeDSqr3qw';

	const fetchUsers = async () => {
	  try {
		const response = await BASE_URL.get('/identity/users', {
		  headers: { Authorization: `Bearer ${token}` },
		});
  
		if (response.data.code === 1000) {
		  setUsers(response.data.result);
		  setLoading(false);
		} else {
		  setError('Failed to fetch users');
		}
	  } catch (err) {
		console.error('Error fetching users:', err);
		setError(err.message);
	  }
	};

  useEffect(() => {
    // Hàm lấy dữ liệu người dùng từ API
	

    fetchUsers();
  }, []); // Chạy một lần khi component mount

  // Nếu đang tải hoặc có lỗi, hiển thị thông báo
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Đếm số lượng người dùng theo giới tính
  const genderStats = users.reduce(
    (acc, user) => {
      if (user.gender === 'Male') acc.male += 1;
      else if (user.gender === 'Female') acc.female += 1;
      else acc.other += 1;
      return acc;
    },
    { male: 0, female: 0, other: 0 }
  );

  // Dữ liệu biểu đồ
  const data = [
    { name: 'Male', value: genderStats.male },
    { name: 'Female', value: genderStats.female },
    { name: 'Other', value: genderStats.other },
  ];

  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Buyer Profile</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
