import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiHome, FiMail, FiShoppingBag, FiUsers } from "react-icons/fi";
import { deleteUser, get, put } from "../services/ApiEndpints";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const userRequest = await get("api/admin/getuser");
        if (userRequest.status === 200) {
          setUsers(userRequest.data.users);
        }

        // Fetch services
        const serviceRequest = await get("api/admin/getservices");
        if (serviceRequest.status === 200) {
          setServices(serviceRequest?.data?.services);
        }

        // Fetch contact submissions
        const submissionsRequest = await get("api/admin/contact-submissions");
        if (submissionsRequest.status === 200) {
          setContactSubmissions(submissionsRequest.data.submissions);
        }

      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete user handler
  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`);
      if (request.status === 200) {
        toast.success(request.data.message);
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Update service status handler
  const handleServiceStatus = async (id, status) => {
    try {
      const request = await put(`/api/admin/services/${id}/status`, { status });
      if (request.status === 200) {
        toast.success(request.data.message);
        setServices(
          services?.map((service) =>
            service._id === id ? { ...service, status } : service
          )
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Mark submission as read handler
  const handleMarkAsRead = async (id) => {
    try {
      const request = await put(`/api/admin/contact-submissions/${id}/read`);
      if (request.status === 200) {
        toast.success(request.data.message);
        setContactSubmissions(
          contactSubmissions.map(submission =>
            submission._id === id ? { ...submission, status: "read" } : submission
          )
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleServiceDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/services/${id}` );
      console.log(`/api/admin/services/${id}`)
      if (request.status === 200) {
        toast.success(request.data.message);
        setServices(services.filter(s => s._id !== id));
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Delete submission handler
  const handleDeleteSubmission = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/contact-submissions/${id}`);
      if (request.status === 200) {
        toast.success(request.data.message);
        setContactSubmissions(contactSubmissions.filter(sub => sub._id !== id));
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin" ? "bg-purple-100 text-purple-800" :
                          user.role === "vendor" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "services":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Service Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{service?.vendor?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === "approved" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {service.status === "pending" && (
                          <button
                            onClick={() => handleServiceStatus(service._id, "approved")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                        <button className="text-white bg-red-300 rounded-lg px-2" onClick={() => handleServiceDelete(service._id)}>Delete</button>
                        {/* <button className="text-white bg-yellow-300 rounded-lg px-2">Reject</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "contacts":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Contact Submissions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contactSubmissions.map((submission) => (
                    <tr key={submission._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{submission.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{submission.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.status === "read" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {submission.status === "unread" && (
                          <button
                            onClick={() => handleMarkAsRead(submission._id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSubmission(submission._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total Users</h3>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Total Services</h3>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Pending Submissions</h3>
                <p className="text-2xl font-bold">{contactSubmissions.filter(s => s.status === "unread").length}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center p-2 rounded-lg ${activeTab === "dashboard" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FiHome className="mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center p-2 rounded-lg ${activeTab === "users" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FiUsers className="mr-3" />
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center p-2 rounded-lg ${activeTab === "services" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FiShoppingBag className="mr-3" />
                Service Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`w-full flex items-center p-2 rounded-lg ${activeTab === "contacts" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FiMail className="mr-3" />
                Contact Submissions
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}