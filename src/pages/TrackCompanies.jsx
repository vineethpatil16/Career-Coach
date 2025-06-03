const TargetCompaniesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
  
    const companies = [
      {
        id: 1,
        name: 'Google',
        logo: '🟡',
        industry: 'Technology',
        location: 'Mountain View, CA',
        size: '100,000+',
        status: 'Applied',
        openRoles: 25,
        culture: 'Innovation-focused',
        lastContact: '2024-01-15'
      },
      {
        id: 2,
        name: 'Microsoft',
        logo: '🔷',
        industry: 'Technology',
        location: 'Redmond, WA',
        size: '200,000+',
        status: 'Interested',
        openRoles: 45,
        culture: 'Inclusive',
        lastContact: null
      },
      {
        id: 3,
        name: 'Netflix',
        logo: '🔴',
        industry: 'Entertainment',
        location: 'Los Gatos, CA',
        size: '11,000+',
        status: 'Researching',
        openRoles: 12,
        culture: 'Freedom & Responsibility',
        lastContact: '2024-01-10'
      }
    ];
  
    const CompanyCard = ({ company }) => (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
              {company.logo}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.industry}</p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            company.status === 'Applied' ? 'bg-success-100 text-success-800' :
            company.status === 'Interested' ? 'bg-warning-100 text-warning-800' :
            'bg-gray-100 text-gray-600'
          }`}>
            {company.status}
          </span>
        </div>
  
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {company.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {company.size} employees
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            {company.openRoles} open roles
          </div>
        </div>
  
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Culture: {company.culture}
          </span>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Target Companies</h1>
            <p className="mt-2 text-gray-600">Track and manage your target companies and applications</p>
          </div>
  
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interested">Interested</option>
              <option value="researching">Researching</option>
            </select>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Company</span>
            </button>
          </div>
  
          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </div>
    );
  };