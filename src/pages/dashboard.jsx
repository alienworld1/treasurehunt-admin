import { useEffect, useState } from "react";
import { getToken } from "../tokenHandler";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [status, setStatus] = useState('active');
  const navigate = useNavigate();

  const updateStatus = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      console.error('Failed to update status');
      return;
    }

    const data = await response.json();
    if (data.status === true) {
      setStatus('active');
    } else {
      setStatus('inactive');
    }
  }

  const start = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/start`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      console.error('Failed to start event');
      return;
    }

    await updateStatus();
  }

  const stop = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stop`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      console.error('Failed to start event');
      return;
    }

    await updateStatus();
  }

  const logout = async () => {
    navigate('/logout');
  }

  useEffect(() => {
    updateStatus();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Event Status: {status}</h1>
      <div className="space-x-4">
        <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded" onClick={start}>Start</button>
        <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded" onClick={stop}>Stop</button>
        <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;