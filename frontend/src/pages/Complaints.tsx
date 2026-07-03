import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { Plus } from "lucide-react";
import { toast } from "sonner";

const GET_API = "http://127.0.0.1:5000/api/complaints/my";
const POST_API = "http://127.0.0.1:5000/api/complaints/";

interface Complaint {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "General",
  priority: "Medium",
});

  //----------------------------------
  // Fetch Complaints
  //----------------------------------

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(GET_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(res.data.complaints);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

    //----------------------------------
  // Submit Complaint
  //----------------------------------

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(POST_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Complaint submitted successfully.");

      setFormData({
  title: "",
  description: "",
  category: "General",
  priority: "Medium",
});

      setShowForm(false);

      fetchComplaints();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit complaint.");
    }
  };

  //----------------------------------
  // Search
  //----------------------------------

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Complaints
        </h1>

        <div className="w-52">

          <Button
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <div className="flex items-center justify-center gap-2">
              <Plus size={18} />
              Register Complaint
            </div>
          </Button>

        </div>

      </div>

      {showForm && (

        <Card>

          <div className="space-y-5">

            <h2 className="text-xl font-semibold">
              Register Complaint
            </h2>

            <Input
              label="Complaint Title"
              placeholder="Enter complaint title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
            <div>

  <label className="mb-2 block text-sm font-medium text-slate-700">
    Category
  </label>

  <select
    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
    value={formData.category}
    onChange={(e) =>
      setFormData({
        ...formData,
        category: e.target.value,
      })
    }
  >

    <option value="General">General</option>
<option value="Water">Water</option>
<option value="Electricity">Electricity</option>
<option value="Security">Security</option>
<option value="Cleaning">Cleaning</option>
<option value="Maintenance">Maintenance</option>

  </select>

</div>


             <div>

  <label className="mb-2 block text-sm font-medium text-slate-700">
    Priority
  </label>

  <select
    className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
    value={formData.priority}
    onChange={(e) =>
      setFormData({
        ...formData,
        priority: e.target.value,
      })
    }
  >
    <option value="High">High</option>
<option value="Medium">Medium</option>
<option value="Low">Low</option>
  </select>

</div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
                placeholder="Describe your complaint..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

            </div>

            <Button onClick={handleSubmit}>
              Submit Complaint
            </Button>

          </div>

        </Card>

      )}

            <Card>

        <div className="space-y-5">

          <Input
            label="Search Complaints"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (

            <div className="py-10 text-center text-slate-500">
              Loading complaints...
            </div>

          ) : filteredComplaints.length === 0 ? (

            <div className="py-10 text-center text-slate-500">
              No complaints found.
            </div>

          ) : (

            <div className="space-y-4">

              {filteredComplaints.map((complaint) => (

                <Card key={complaint.id}>

                  <div className="space-y-3">

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-semibold text-slate-800">
                        {complaint.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          complaint.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : complaint.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <p className="text-slate-600">
                      {complaint.description}
                    </p>

                    <div className="flex gap-2">

  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
    {complaint.category}
  </span>

  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      complaint.priority === "High"
        ? "bg-red-100 text-red-700"
        : complaint.priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {complaint.priority}
  </span>

</div>

                    <div className="flex items-center justify-between text-sm text-slate-500">

                      <span>
                        Complaint #{complaint.id}
                      </span>

                      <span>
                        {new Date(
                          complaint.created_at
                        ).toLocaleString()}
                      </span>

                    </div>


                  </div>

                </Card>

              ))}

            </div>

          )}

        </div>

      </Card>

    </div>

  );
}