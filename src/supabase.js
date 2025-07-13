// UseEffect to fetch data from Supabase
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const fetchProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error fetching projects:', error);
  }
  return data;
};

const [projects, setProjects] = useState([]);
useEffect(() => {
  fetchProjects().then(setProjects);
}, []);
