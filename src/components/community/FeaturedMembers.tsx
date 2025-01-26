import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  profileUrl: string;
}

interface FeaturedMembersProps {
  members: Member[];
}

const FeaturedMembers: React.FC<FeaturedMembersProps> = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold mb-4">Featured Members</h3>
      <div className="space-y-4">
        {members.map((member) => (
          <motion.a
            key={member.id}
            href={member.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group"
            whileHover={{ x: 2 }}
          >
            <div className="flex items-center space-x-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMembers;