// src/components/shared/CTA.jsx
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const CTA = ({ ctaData }) => {
  const theme = useTheme();

  return (
    <section 
      id="support" 
      className="py-20 bg-cta-gradient"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-6">{ctaData.title}</h2>
        <p className="text-xl text-white/90 mb-8">{ctaData.description}</p>
        <Button 
          to="/support" 
          variant="outline"
          size="large"
          className="bg-white text-primary hover:bg-white/90 border-white hover:border-white hover:text-white"
        >
          Unterstützen
        </Button>
      </div>
    </section>
  );
};

export default CTA;