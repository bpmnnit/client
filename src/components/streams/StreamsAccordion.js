import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StreamsAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { streams } = props;

  return streams.map(stream => {
    return(
      <Accordion key={stream._id} expanded={expanded === stream._id} onChange={handleChange(`${stream._id}`)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${stream._id}-content`} id={`${stream._id}-content`}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}> { stream.sig }</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{ stream.area }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  });
}