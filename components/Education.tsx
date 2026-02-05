import { Calendar, MapPin, Star } from 'lucide-react'

const education = [
  {
    id: 1,
    type: 'Education',
    title: 'Bachelor of Computer Science & AI',
    institution: 'Tech University',
    location: 'San Francisco, CA',
    startDate: '2019',
    endDate: '2023',
    description: 'GPA: 3.8/4.0. Specialized in Machine Learning, Data Science, and Full Stack Development.',
    highlights: ['Dean\'s List', 'AI Research Published', 'Teaching Assistant'],
  },
  {
    id: 2,
    type: 'Work Experience',
    title: 'ML Engineer',
    institution: 'AI Tech Company',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
    description: 'Building production ML systems processing millions of data points. Developing NLP and computer vision models.',
    highlights: ['94% model accuracy', '10x inference speed', 'Team lead'],
  },
  {
    id: 3,
    type: 'Work Experience',
    title: 'Data Scientist',
    institution: 'Analytics Startup',
    location: 'New York, NY',
    startDate: '2022',
    endDate: '2023',
    description: 'Developed predictive models and data pipelines for enterprise clients. Implemented ML workflows.',
    highlights: ['5 ML models', 'Python expertise', 'Full stack ML'],
  },
  {
    id: 4,
    type: 'Education',
    title: 'Deep Learning Specialization',
    institution: 'Coursera / Deep Learning',
    location: 'Online',
    startDate: '2023',
    endDate: '2024',
    description: 'Advanced deep learning with focus on neural networks, CNNs, RNNs, and transformers.',
    highlights: ['TensorFlow certified', 'Project portfolio', 'State-of-art practices'],
  },
]

export default function Education() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center scroll-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Education & Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            A journey of continuous learning and professional growth in AI and ML.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {education.map((item, index) => (
            <div key={item.id} className="relative group">
              {/* Timeline line */}
              {index !== education.length - 1 && (
                <div className="absolute left-8 top-32 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
              )}

              {/* Timeline item */}
              <div className="flex gap-6 pb-12 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Timeline dot */}
                <div className="relative flex flex-col items-center mt-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse group-hover:animate-none" style={{ width: '16px', height: '16px' }} />
                </div>

                {/* Content */}
                <div className="flex-1 group/card">
                  <div className={`p-6 rounded-2xl transition-all duration-300 border ${
                    item.type === 'Education'
                      ? 'bg-primary/5 border-primary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20'
                      : 'bg-secondary/5 border-secondary/20 hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/20'
                  }`}>
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.type === 'Education'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary/20 text-secondary'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.startDate} - {item.endDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover/card:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                      <span className="font-semibold">{item.institution}</span>
                      <span className="text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-background border border-border hover:border-primary/50 transition-all"
                        >
                          <Star className="w-3 h-3 text-primary" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                5+
              </div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center border-l border-r border-border">
              <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
                20+
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-muted-foreground">Clients Satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
