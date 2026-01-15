import { Box, Typography, TextField, Button, Stack, Chip } from "@mui/material";
import { useState } from "react";

// Helper: capitalize first letter
const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const Form = ({ data, setData }) => {
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // --- Skills ---
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      const newSkills = [...data.skills, capitalize(skillInput.trim())];
      setData({ ...data, skills: newSkills });
      setSkillInput("");
    }
  };
  const removeSkill = (index) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    setData({ ...data, skills: newSkills });
  };

  // --- Languages ---
  const handleLanguageKeyDown = (e) => {
    if (e.key === "Enter" && languageInput.trim() !== "") {
      e.preventDefault();
      const newLanguages = [...data.languages.split("\n"), capitalize(languageInput.trim())].filter(Boolean);
      setData({ ...data, languages: newLanguages.join("\n") });
      setLanguageInput("");
    }
  };

  // --- Experience ---
  const addExperience = () => setData({ ...data, experience: [...data.experience, { company: "", role: "", description: "" }] });
  const removeExperience = (idx) => {
    const exp = [...data.experience];
    exp.splice(idx, 1);
    setData({ ...data, experience: exp });
  };
  const handleExperienceChange = (idx, field, value) => {
    const exp = [...data.experience];
    exp[idx][field] = capitalize(value);
    setData({ ...data, experience: exp });
  };

  // --- Projects ---
  const addProject = () => setData({ ...data, projects: [...data.projects, { name: "", description: "", technologies: "" }] });
  const removeProject = (idx) => {
    const proj = [...data.projects];
    proj.splice(idx, 1);
    setData({ ...data, projects: proj });
  };
  const handleProjectChange = (idx, field, value) => {
    const proj = [...data.projects];
    proj[idx][field] = capitalize(value);
    setData({ ...data, projects: proj });
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, background: "white" }}>
      <Typography variant="h6" mb={2}>Resume Details</Typography>

      <TextField fullWidth label="Full Name" name="name" margin="dense" onChange={(e) => setData({ ...data, name: capitalize(e.target.value) })} />
      <TextField fullWidth label="Job Title" name="title" margin="dense" onChange={(e) => setData({ ...data, title: capitalize(e.target.value) })} />
      <TextField fullWidth label="Email" name="email" margin="dense" onChange={handleChange} />
      <TextField fullWidth label="Phone" name="phone" margin="dense" onChange={handleChange} />
      <TextField fullWidth label="LinkedIn URL" name="linkedin" margin="dense" onChange={handleChange} />
      <TextField fullWidth label="GitHub URL" name="github" margin="dense" onChange={handleChange} />

      <TextField fullWidth label="Professional Summary" name="summary" multiline rows={3} margin="dense" onChange={(e) => setData({ ...data, summary: capitalize(e.target.value) })} />

      {/* Skills */}
      <Box mt={2}>
        <Typography variant="subtitle1">Skills</Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
          {data.skills.map((skill, idx) => <Chip key={idx} label={skill} onDelete={() => removeSkill(idx)} color="primary" />)}
        </Box>
        <TextField
          placeholder="Type a skill and press Enter"
          fullWidth
          size="small"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKeyDown}
          margin="dense"
        />
      </Box>

      {/* Experience */}
      <Box mt={2}>
        <Typography variant="subtitle1">Experience</Typography>
        {data.experience.map((exp, idx) => (
          <Stack key={idx} spacing={1} mb={1} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}>
            <TextField label="Company Name" size="small" value={exp.company} onChange={(e) => handleExperienceChange(idx, "company", e.target.value)} />
            <TextField label="Role" size="small" value={exp.role} onChange={(e) => handleExperienceChange(idx, "role", e.target.value)} />
            <TextField label="Description" size="small" multiline rows={2} value={exp.description} onChange={(e) => handleExperienceChange(idx, "description", e.target.value)} />
            <Button size="small" color="error" onClick={() => removeExperience(idx)}>Remove</Button>
          </Stack>
        ))}
        <Button size="small" onClick={addExperience}>Add Experience</Button>
      </Box>

      {/* Projects */}
      <Box mt={2}>
        <Typography variant="subtitle1">Projects</Typography>
        {data.projects.map((proj, idx) => (
          <Stack key={idx} spacing={1} mb={1} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}>
            <TextField label="Project Name" size="small" value={proj.name} onChange={(e) => handleProjectChange(idx, "name", e.target.value)} />
            <TextField label="Project Description" size="small" multiline rows={2} value={proj.description} onChange={(e) => handleProjectChange(idx, "description", e.target.value)} />
            <TextField label="Technologies Used" size="small" value={proj.technologies} onChange={(e) => handleProjectChange(idx, "technologies", e.target.value)} />
            <Button size="small" color="error" onClick={() => removeProject(idx)}>Remove</Button>
          </Stack>
        ))}
        <Button size="small" onClick={addProject}>Add Project</Button>
      </Box>

      <TextField fullWidth label="Education" name="education" multiline rows={2} margin="dense" onChange={(e) => setData({ ...data, education: capitalize(e.target.value) })} />
      <TextField fullWidth label="Certifications (one per line)" name="certifications" multiline rows={2} margin="dense" onChange={(e) => setData({ ...data, certifications: capitalize(e.target.value) })} />
      <TextField fullWidth label="Languages (one per line)" name="languages" multiline rows={2} margin="dense" value={languageInput} onChange={(e) => setLanguageInput(e.target.value)} onKeyDown={handleLanguageKeyDown} />
    </Box>
  );
};

export default Form;
