import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  FileText, 
  Camera, 
  Edit3, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveBasicInfo = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateProfile({ 
        ...user,
        name,
        email
      });
      setIsEditingBasic(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and career details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold border-4 border-white shadow-md">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <button 
                    className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full shadow-sm hover:bg-primary-700 transition-colors"
                    aria-label="Change profile picture"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                
                <div className="mt-3 inline-flex">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'user' ? 'bg-gray-100 text-gray-800' : 
                    user.role === 'mentor' ? 'bg-secondary-100 text-secondary-800' : 
                    'bg-primary-100 text-primary-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Current Progress</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Current Phase</span>
                      <span className="text-primary-600">{user.currentPhase.charAt(0).toUpperCase() + user.currentPhase.slice(1)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Overall Progress</span>
                      <span className="text-primary-600">
                        {Math.round((user.phaseProgress.introspection + user.phaseProgress.exploration + 
                        user.phaseProgress.reflection + user.phaseProgress.action) / 4)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              {!isEditingBasic && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingBasic(true)}
                  leftIcon={<Edit3 size={16} />}
                >
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditingBasic ? (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    leftIcon={<UserIcon size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    leftIcon={<Phone size={18} className="text-gray-400" />}
                    fullWidth
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-8 flex-shrink-0">
                      <UserIcon size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="mt-1 text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 flex-shrink-0">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="mt-1 text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 flex-shrink-0">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="mt-1 text-gray-500 italic">Not provided</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditingBasic && (
              <CardFooter className="flex justify-end space-x-2 border-t border-gray-200 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditingBasic(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSaveBasicInfo}
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Professional Background</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<Edit3 size={16} />}
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-3">
                    <Briefcase size={18} className="text-gray-400 mr-2" /> Work Experience
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <p className="text-gray-500 italic text-sm">No work experience added yet</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Add Work Experience
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-3">
                    <GraduationCap size={18} className="text-gray-400 mr-2" /> Education
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <p className="text-gray-500 italic text-sm">No education history added yet</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Add Education
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center mb-3">
                    <FileText size={18} className="text-gray-400 mr-2" /> Resume
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <p className="text-gray-500 italic text-sm">No resume uploaded yet</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Upload Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;