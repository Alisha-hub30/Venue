import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiHome, FiInfo, FiMail, FiShoppingBag, FiUsers } from "react-icons/fi";
import { deleteUser, get, put } from "../services/ApiEndpints";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const userRequest = await get("api/admin/getuser");
        if (userRequest.status === 200) {
          setUsers(userRequest.data.users);
        }

        // Fetch services with all needed details
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
        setSelectedService(null); // Close modal after action
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
      const request = await deleteUser(`/api/admin/services/${id}`);
      if (request.status === 200) {
        toast.success(request.data.message);
        setServices(services.filter(s => s._id !== id));
        setSelectedService(null); // Close modal if open
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

  // Filter services by status
  const filteredServices = services.filter(service => 
    statusFilter === "all" || service.status === statusFilter
  );

  const renderContent = () => {
    switch (activeTab) {
      case "users":
  // Add this filter before rendering
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.role.toLowerCase().includes(userSearch.toLowerCase())
      );

      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User Management</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users by name, email or role..."
                className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
              {userSearch && (
                <button 
                  onClick={() => setUserSearch("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-2 text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No users found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
      case "services":
  // Filter services by both status and search term
        const filteredServices = services.filter(service => 
          (statusFilter === "all" || service.status === statusFilter) &&
          (service.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
          service.category.toLowerCase().includes(serviceSearch.toLowerCase()) ||
          (service?.vendor?.name?.toLowerCase()?.includes(serviceSearch.toLowerCase()) ?? false))
        );

        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Service Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                  />
                  {serviceSearch && (
                    <button 
                      onClick={() => setServiceSearch("")}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div>
                  <label className="mr-2 font-medium">Status:</label>
                  <select 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-2 text-sm text-gray-500">
              Showing {filteredServices.length} of {services.length} services
              {serviceSearch && ` matching "${serviceSearch}"`}
              {statusFilter !== 'all' && ` with status "${statusFilter}"`}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <tr key={service._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{service.title}</div>
                          <button 
                            onClick={() => setSelectedService(service)}
                            className="text-blue-600 text-xs flex items-center mt-1"
                          >
                            <FiInfo className="mr-1" /> View details
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{service.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{service?.vendor?.name}</div>
                          <div className="text-xs text-gray-500">{service?.vendor?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {service.price} {service.priceUnit && `(${service.priceUnit})`}
                          {service.discount > 0 && (
                            <div className="text-xs text-green-600">
                              {service.discount}% discount
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            service.status === "approved" ? "bg-green-100 text-green-800" :
                            service.status === "rejected" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {service.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleServiceStatus(service._id, "approved")}
                                className="text-green-600 hover:text-green-900 mr-2"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleServiceStatus(service._id, "rejected")}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleServiceDelete(service._id)}
                            className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-2 py-1 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        {services.length === 0 
                          ? 'No services available' 
                          : 'No services match your search criteria'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Service Details Modal */}
            {selectedService && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{selectedService.title}</h3>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-700">Service Details</h4>
                      <p className="text-sm text-gray-600">Category: {selectedService.category}</p>
                      <p className="text-sm text-gray-600">Location: {selectedService.location}</p>
                      <p className="text-sm text-gray-600">
                        Price: {selectedService.price} {selectedService.priceUnit && `(${selectedService.priceUnit})`}
                      </p>
                      {selectedService.discount > 0 && (
                        <p className="text-sm text-gray-600">
                          Discount: {selectedService.discount}%
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Status: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedService.status === "approved" ? "bg-green-100 text-green-800" :
                          selectedService.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {selectedService.status}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700">Vendor Information</h4>
                      <p className="text-sm text-gray-600">Name: {selectedService?.vendor?.name}</p>
                      <p className="text-sm text-gray-600">Email: {selectedService?.vendor?.email}</p>
                      <p className="text-sm text-gray-600">Phone: {selectedService?.vendor?.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  {selectedService.description && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700">Description</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{selectedService.description}</p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 mt-4">
                    {selectedService.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            handleServiceStatus(selectedService._id, "approved");
                            setSelectedService(null);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Approve Service
                        </button>
                        <button
                          onClick={() => {
                            handleServiceStatus(selectedService._id, "rejected");
                            setSelectedService(null);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Reject Service
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleServiceDelete(selectedService._id);
                        setSelectedService(null);
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Delete Service
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "contacts":
  // Filter submissions based on search term
        const filteredSubmissions = contactSubmissions.filter(submission => 
          submission.fullName.toLowerCase().includes(contactSearch.toLowerCase()) ||
          submission.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
          submission.message.toLowerCase().includes(contactSearch.toLowerCase())
        );

        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Contact Submissions</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email or message..."
                  className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                />
                {contactSearch && (
                  <button 
                    onClick={() => setContactSearch("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 text-sm text-gray-500">
              Showing {filteredSubmissions.length} of {contactSubmissions.length} submissions
              {contactSearch && ` matching "${contactSearch}"`}
            </div>

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
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <tr key={submission._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{submission.fullName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="truncate hover:whitespace-normal hover:overflow-visible hover:max-w-none">
                            {submission.message}
                          </div>
                        </td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        {contactSubmissions.length === 0 
                          ? 'No contact submissions available' 
                          : 'No submissions match your search criteria'}
                      </td>
                    </tr>
                  )}
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