"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaSignOutAlt, FaLock } from 'react-icons/fa';
import { projectsAPI, adminAPI } from '@/lib/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';

interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubLink: string;
  liveLink: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    imageUrl: '',
    githubLink: '',
    liveLink: '',
    description: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Check auth state on load
  useEffect(() => {
    const authStatus = localStorage.getItem('is_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data as Project[] || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginError('');
      const allowedAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      
      if (email !== allowedAdmin) {
        setLoginError('هذا الحساب ليس حساب المدير المعتمد');
        return;
      }

      const response = await adminAPI.login({ email, password });
      if (response?.data?.uid) {
        localStorage.setItem('is_admin_authenticated', 'true');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error', error);
      setLoginError('فشل تسجيل الدخول. تأكد من البيانات.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('is_admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      if (editingProject?._id) {
        await projectsAPI.update(editingProject._id, formData);
      } else {
        await projectsAPI.create(formData);
      }

      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please check if Firestore is configured correctly.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      imageUrl: project.imageUrl,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      description: project.description
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      githubLink: '',
      liveLink: '',
      description: ''
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <FaLock className="text-3xl text-indigo-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Please sign in to manage your portfolio
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                {loginError}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 h-12 rounded-xl text-lg font-semibold transition-all">
              Sign In
            </Button>
          </form>

          <Link href="/" className="mt-8 flex items-center justify-center text-slate-500 hover:text-indigo-400 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Admin Navbar */}
      <nav className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">Admin Dashboard</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-500/5"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Project Management</h1>
            <p className="text-slate-400">Manage and showcase your best technical works.</p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); if(!showForm) setEditingProject(null); }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-indigo-500/20 transition-all self-start"
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            <span>{showForm ? 'Cancel Operation' : 'Add New Project'}</span>
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    {editingProject ? <FaEdit className="text-indigo-500" /> : <FaPlus className="text-indigo-500" />}
                  </span>
                  {editingProject ? 'Edit Project Details' : 'Initialize New Project'}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-400 mb-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. AI-Powered Analytics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">GitHub Repository</label>
                    <input
                      type="url"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-400 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      name="liveLink"
                      value={formData.liveLink}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-400 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Technical overview of the project..."
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {submitLoading ? <Loader2 className="animate-spin" /> : <FaSave />}
                      {editingProject ? 'Apply Changes' : 'Confirm & Save'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl transition-all"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest flex items-center gap-4">
            Living Collection ({projects.length})
            <div className="h-[1px] flex-1 bg-slate-800"></div>
          </h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-all">
                  <div className="h-40 relative bg-slate-800 overflow-hidden">
                    <img src={project.imageUrl || "/project1.jpg"} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => project._id && handleDelete(project._id)}
                          className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 truncate">{project.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-800">
                      <span>{project.githubLink ? 'GitLinked' : 'No Repository'}</span>
                      <span className="text-indigo-400 font-medium">Ready for display</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
              <p className="text-slate-500">Waitlisted for project deployment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
