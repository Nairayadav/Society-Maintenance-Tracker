import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const API = "http://127.0.0.1:5000/api/notices/";

interface Notice {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  //---------------------------------
  // Fetch Notices
  //---------------------------------

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotices(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

    //---------------------------------
  // Add Notice
  //---------------------------------

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

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Notice added successfully.");

      setFormData({
        title: "",
        description: "",
      });

      setShowForm(false);

      fetchNotices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add notice.");
    }
  };

  //---------------------------------
  // Search
  //---------------------------------

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      notice.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Society Notices
        </h1>

        <div className="w-48">
          <Button
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <div className="flex items-center justify-center gap-2">
              <Plus size={18} />
              Add Notice
            </div>
          </Button>
        </div>

      </div>

      {showForm && (

        <Card>

          <div className="space-y-5">

            <h2 className="text-xl font-semibold">
              Publish Notice
            </h2>

            <Input
              label="Notice Title"
              placeholder="Enter title"
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
                Description
              </label>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
                placeholder="Enter notice description"
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
              Publish Notice
            </Button>

          </div>

        </Card>

      )}
            <Card>

        <div className="space-y-5">

          <Input
            label="Search Notices"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (

            <div className="py-10 text-center text-slate-500">
              Loading notices...
            </div>

          ) : filteredNotices.length === 0 ? (

            <div className="py-10 text-center text-slate-500">
              No notices found.
            </div>

          ) : (

            <div className="space-y-4">

              {filteredNotices.map((notice) => (

                <Card key={notice.id}>

                  <div className="space-y-3">

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-semibold text-slate-800">
                        {notice.title}
                      </h3>

                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        #{notice.id}
                      </span>

                    </div>

                    <p className="text-slate-600">
                      {notice.description}
                    </p>

                    <div className="text-sm text-slate-500">
                      Published on{" "}
                      {new Date(
                        notice.created_at
                      ).toLocaleString()}
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