import html2pdf from "html2pdf.js";
import { Box, Button, Chip, Typography } from "@mui/material";

// Helper: Capitalize first letter of each sentence
const capitalizeSentences = (text) => {
  if (!text) return null;
  return text
    .split("\n")
    .map((line, i) =>
      line
        ? line.charAt(0).toUpperCase() + line.slice(1)
        : ""
    )
    .map((line, i) => <div key={i}>{line}</div>);
};

// Helper: List lines for ul
const listLines = (text) =>
  text
    .split("\n")
    .filter(Boolean)
    .map((line, i) => <li key={i}>{line.charAt(0).toUpperCase() + line.slice(1)}</li>);

const Preview = ({ data }) => {
  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 15,
        filename: "Resume.pdf",
        html2canvas: { scale: 1 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(document.getElementById("resume"))
      .save();
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, background: "#fff", overflowX: "auto" }}>
      <Box
        id="resume"
        sx={{ width: "210mm", minHeight: "297mm", p: 3, background: "#fff" }}
      >
        {/* Header */}
        <Typography variant="h4" align="center" fontWeight="bold">
          {data.name || "Your Name"}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary">
          {data.title}
        </Typography>
        <Typography align="center" color="textSecondary" fontSize={14}>
          {data.email} · {data.phone} <br /> {data.linkedin} · {data.github}
        </Typography>

        {/* Summary */}
        {data.summary && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Summary
            </Typography>
            {capitalizeSentences(data.summary)}
          </Box>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Skills
            </Typography>
            <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
              {data.skills.map((skill, idx) => (
                <Chip key={idx} label={skill} color="primary" />
              ))}
            </Box>
          </Box>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Experience
            </Typography>
            {data.experience.map((exp, idx) => (
              <Box key={idx} mt={1}>
                <Typography fontWeight="bold">{exp.company}</Typography>
                <Typography fontStyle="italic">{exp.role}</Typography>
                {capitalizeSentences(exp.description)}
              </Box>
            ))}
          </Box>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Projects
            </Typography>
            {data.projects.map((proj, idx) => (
              <Box key={idx} mt={1}>
                <Typography fontWeight="bold">{proj.name}</Typography>
                {capitalizeSentences(proj.description)}
                {proj.technologies && (
                  <Typography
                    fontStyle="italic"
                    sx={{ textDecoration: "underline", color: "#444" }}
                  >
                    Technologies: {proj.technologies}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Education */}
        {data.education && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Education
            </Typography>
            {capitalizeSentences(data.education)}
          </Box>
        )}

        {/* Certifications */}
        {data.certifications && (
          <Box mt={2} borderBottom="2px solid #999" pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Certifications
            </Typography>
            <ul>{listLines(data.certifications)}</ul>
          </Box>
        )}

        {/* Languages */}
        {data.languages && (
          <Box mt={2} pb={1}>
            <Typography variant="h6" fontWeight="bold">
              Languages
            </Typography>
            <ul>{listLines(data.languages)}</ul>
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={downloadPDF}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default Preview;
