// src/components/shared/About.jsx
import { useTheme } from '../../context/ThemeContext';

const About = ({ aboutData }) => {
  const theme = useTheme();

  return (
    <section
      id="about"
      className="py-20 bg-main-gradient"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{aboutData.title}</h2>
            <p className="text-gray-600 mb-8">{aboutData.description}</p>
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-primary/20 to-tertiary"
            ></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8">
              <div className="bg-gray-100 rounded-xl aspect-[4/3]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;