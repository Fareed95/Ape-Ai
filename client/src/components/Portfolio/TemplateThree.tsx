import { motion } from 'framer-motion';
import AIEffect from './AIEffect';
import { AIHero } from './AIHero';
import { AISkillCard } from './AISkillCard';
import { TextRevealCard } from './TextRevealCard';

interface UserDetails {
  id: number;
  name?: string;
  about?: string;
  education?: any[];
  project?: any[];
  certificate?: any[];
}

interface ToolName {
  id: number;
  name: string;
  tools?: any[];
}

interface PortfolioData {
  userDetails: UserDetails;
  toolNames: ToolName[];
}

interface TemplateThreeProps {
  userDetails: UserDetails;
  portfolioData: PortfolioData;
}

export const TemplateThree = ({ userDetails, portfolioData }: TemplateThreeProps) => {
  return (
    <div className="min-h-screen bg-neutral-950 relative">
      <AIEffect />
      <AIHero userDetails={userDetails} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              AI Skills & Expertise
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {portfolioData?.toolNames?.map((toolName) => (
              <AISkillCard key={toolName.id} toolName={toolName} />
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <TextRevealCard>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Education</h2>
              <div className="space-y-4 sm:space-y-6">
                {portfolioData?.userDetails?.education?.map((edu) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{edu.degree}</h3>
                        <p className="text-blue-400 mt-2">{edu.field_of_study}</p>
                        <p className="text-neutral-400 mt-1">{edu.University}</p>
                        <p className="text-neutral-400">{edu.location}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-neutral-300">{edu.start_date} - {edu.end_date}</p>
                        {edu.current_grade && (
                          <p className="text-blue-400 mt-2">Grade: {edu.current_grade}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TextRevealCard>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <TextRevealCard>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {portfolioData?.userDetails?.project?.map((proj) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{proj.name}</h3>
                    <p className="text-neutral-400 mt-4">{proj.description}</p>
                    <div className="mt-6">
                      {proj.link && proj.link.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {proj.link.map((link: any) => (
                            <motion.a
                              key={link.id}
                              href={link.url || link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 sm:px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {link.name}
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TextRevealCard>
        </motion.section>

        {/* Certificates Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <TextRevealCard>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {portfolioData?.userDetails?.certificate?.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{cert.name}</h3>
                    <p className="text-blue-400 mt-2">{cert.issuing_organization}</p>
                    <div className="flex flex-col sm:flex-row justify-between mt-4">
                      <p className="text-neutral-400">Competition Battled: {cert.competition_battled}</p>
                      <p className="text-neutral-400 mt-2 sm:mt-0">Competition Won: {cert.competition_won}</p>
                    </div>
                    {cert.credential_id && (
                      <p className="text-blue-400 mt-2">Credential ID: {cert.credential_id}</p>
                    )}
                    {cert.credential_url && (
                      <motion.a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 sm:px-4 py-2 mt-4 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Certificate
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </TextRevealCard>
        </motion.section>
      </div>
    </div>
  );
};
